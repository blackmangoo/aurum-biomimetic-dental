"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { ScrollSceneConfig, SceneHotspot } from "@/data/clinicData";
import { TOUCH_STICKY_MEDIA_QUERY } from "@/lib/useSceneScrollScrub";
import { renderBiomimeticSceneFrame } from "@/lib/biomimeticSynthRenderer";

interface ScrollSequenceStageProps {
  scene: ScrollSceneConfig;
  eager?: boolean;
  className?: string;
  onActChange?: (actIndex: 0 | 1 | 2) => void;
  progressBarRef?: React.RefObject<HTMLDivElement | null>;
  actStepManual?: 0 | 1 | 2 | null;
}

type DecodedFrame = ImageBitmap | HTMLImageElement;

interface MobilePackIndex {
  version: number;
  width: number;
  height: number;
  count: number;
  totalBytes: number;
  frames: { o: number; l: number }[];
}

interface StreamingMobilePack {
  meta: MobilePackIndex;
  bytes: Uint8Array<ArrayBuffer>;
  receivedBytes: number;
  complete: boolean;
  listeners: Set<() => void>;
}

// Track active scroll timestamp so background non-playhead bitmap uploads yield during touch swipes
let globalLastScrollTs = 0;
if (typeof window !== "undefined") {
  const markScroll = () => {
    globalLastScrollTs = performance.now();
  };
  window.addEventListener("scroll", markScroll, { passive: true });
  window.addEventListener("touchmove", markScroll, { passive: true });
}

const streamingPackCache = new Map<string, Promise<StreamingMobilePack | null>>();
let packStreamChain: Promise<unknown> = Promise.resolve();

function openStreamingMobilePack(
  packJsonUrl: string,
  packBinUrl: string,
  urgent: boolean
): Promise<StreamingMobilePack | null> {
  const existing = streamingPackCache.get(packBinUrl);
  if (existing) return existing;

  const startStream = async (): Promise<StreamingMobilePack | null> => {
    try {
      const idxResp = await fetch(packJsonUrl, { cache: "force-cache" });
      if (!idxResp.ok) return null;
      const meta = (await idxResp.json()) as MobilePackIndex;

      const binResp = await fetch(packBinUrl, { cache: "force-cache" });
      if (!binResp.ok) return null;

      const state: StreamingMobilePack = {
        meta,
        bytes: new Uint8Array(new ArrayBuffer(meta.totalBytes)),
        receivedBytes: 0,
        complete: false,
        listeners: new Set(),
      };

      const notify = () => {
        for (const fn of state.listeners) fn();
      };

      if (binResp.body && typeof binResp.body.getReader === "function") {
        const reader = binResp.body.getReader();
        void (async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              if (value && value.byteLength > 0) {
                const end = Math.min(
                  state.bytes.byteLength,
                  state.receivedBytes + value.byteLength
                );
                const len = end - state.receivedBytes;
                if (len > 0) {
                  state.bytes.set(value.subarray(0, len), state.receivedBytes);
                  state.receivedBytes = end;
                  notify();
                }
              }
            }
            state.complete = true;
            notify();
          } catch {
            streamingPackCache.delete(packBinUrl);
          }
        })();
        return state;
      }

      const ab = await binResp.arrayBuffer();
      const src = new Uint8Array(ab);
      state.bytes.set(src.subarray(0, state.bytes.byteLength), 0);
      state.receivedBytes = Math.min(src.byteLength, state.bytes.byteLength);
      state.complete = true;
      return state;
    } catch {
      streamingPackCache.delete(packBinUrl);
      return null;
    }
  };

  let handlePromise: Promise<StreamingMobilePack | null>;
  if (urgent) {
    handlePromise = startStream();
    packStreamChain = packStreamChain.then(() =>
      handlePromise.then(
        (st) =>
          st && !st.complete
            ? new Promise<void>((resolve) => {
                const check = () => {
                  if (st.complete) {
                    st.listeners.delete(check);
                    resolve();
                  }
                };
                st.listeners.add(check);
              })
            : undefined
      )
    );
  } else {
    handlePromise = packStreamChain.then(() => startStream());
    packStreamChain = handlePromise.then(
      (st) =>
        st && !st.complete
          ? new Promise<void>((resolve) => {
              const check = () => {
                if (st.complete) {
                  st.listeners.delete(check);
                  resolve();
                }
              };
              st.listeners.add(check);
            })
          : undefined
    );
  }

  streamingPackCache.set(packBinUrl, handlePromise);
  return handlePromise;
}

function formatFrameUrl(dir: string, oneBasedIndex: number): string {
  const num = String(oneBasedIndex).padStart(4, "0");
  return `${dir}/frame_${num}.webp`;
}

function getFrameDimensions(frame: DecodedFrame): { w: number; h: number } {
  if ("naturalWidth" in frame) {
    return { w: frame.naturalWidth, h: frame.naturalHeight };
  }
  return { w: frame.width, h: frame.height };
}

function hexToRgbTuple(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function buildStaticVignetteCss(
  sceneId: ScrollSceneConfig["id"],
  sectionBgHex: string
): string {
  const [r, g, b] = hexToRgbTuple(sectionBgHex);
  const innerStop =
    sceneId === "scene-02-implant"
      ? 55
      : sceneId === "scene-03-scan-whitening"
      ? 66
      : 61;
  const s1 = innerStop + 10;
  const s2 = innerStop + 20;
  const s3 = Math.min(93, innerStop + 29);
  return `radial-gradient(50% 49.5% at 50% 50%, rgba(${r},${g},${b},0) ${innerStop}%, rgba(${r},${g},${b},0.18) ${s1}%, rgba(${r},${g},${b},0.56) ${s2}%, rgba(${r},${g},${b},0.88) ${s3}%, rgb(${r},${g},${b}) 97.5%)`;
}

export function ScrollSequenceStage({
  scene,
  eager = false,
  className = "",
  onActChange,
  progressBarRef,
  actStepManual = null,
}: ScrollSequenceStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const framesRef = useRef<(DecodedFrame | null)[]>([]);
  const loadedMaskRef = useRef<Uint8Array>(new Uint8Array(0));
  const inFlightMaskRef = useRef<Uint8Array>(new Uint8Array(0));

  const targetFrameRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const drawnFrameRef = useRef<number>(-1);
  const activeActRef = useRef<0 | 1 | 2>(0);
  const totalFramesRef = useRef<number>(scene.desktop.frameCount);
  const rafIdRef = useRef<number>(0);

  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [atClimax, setAtClimax] = useState<boolean>(false);
  const [selectedHotspot, setSelectedHotspot] = useState<SceneHotspot | null>(null);
  const climaxRef = useRef<boolean>(false);

  const vignetteOverlayCss = useMemo(
    () => buildStaticVignetteCss(scene.id, scene.sectionBgHex),
    [scene.id, scene.sectionBgHex]
  );

  const findNearestLoadedIndex = useCallback((desiredIdx: number): number => {
    const mask = loadedMaskRef.current;
    const total = mask.length;
    if (total === 0) return -1;
    const clamped = Math.max(0, Math.min(total - 1, desiredIdx));
    if (mask[clamped] === 1) return clamped;

    for (let delta = 1; delta < total; delta++) {
      const prev = clamped - delta;
      if (prev >= 0 && mask[prev] === 1) return prev;
      const next = clamped + delta;
      if (next < total && mask[next] === 1) return next;
    }
    return -1;
  }, []);

  const flushDraw = useCallback(
    (forceRedraw = false) => {
      rafIdRef.current = 0;
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (progressBarRef?.current) {
        progressBarRef.current.style.transform = `scaleX(${targetProgressRef.current.toFixed(
          4
        )})`;
      }

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      let ctx = ctxRef.current;
      if (!ctx) {
        ctx = canvas.getContext("2d", { alpha: false });
        ctxRef.current = ctx;
      }
      if (!ctx) return;

      const bestIdx = findNearestLoadedIndex(targetFrameRef.current);

      if (bestIdx >= 0) {
        if (!forceRedraw && bestIdx === drawnFrameRef.current) return;
        const frame = framesRef.current[bestIdx];
        if (frame) {
          const { w: fw, h: fh } = getFrameDimensions(frame);
          if (fw > 0 && fh > 0) {
            if (fw === cw && fh === ch) {
              ctx.drawImage(frame, 0, 0, cw, ch);
            } else {
              ctx.fillStyle = scene.sectionBgHex;
              ctx.fillRect(0, 0, cw, ch);
              const scale = Math.min(cw / fw, ch / fh);
              const dw = Math.round(fw * scale);
              const dh = Math.round(fh * scale);
              const dx = Math.round((cw - dw) * 0.5);
              const dy = Math.round((ch - dh) * 0.5);
              ctx.drawImage(frame, dx, dy, dw, dh);
            }
            drawnFrameRef.current = bestIdx;
            return;
          }
        }
      }

      // Built-in 60/120Hz 3D Biomimetic Anatomical Renderer when external frame pack is not yet loaded
      if (!forceRedraw && targetFrameRef.current === drawnFrameRef.current) {
        return;
      }
      renderBiomimeticSceneFrame(
        ctx,
        scene.id,
        cw,
        ch,
        targetProgressRef.current,
        scene.sectionBgHex
      );
      drawnFrameRef.current = targetFrameRef.current;
    },
    [findNearestLoadedIndex, progressBarRef, scene.id, scene.sectionBgHex]
  );

  const scheduleDraw = useCallback(
    (syncNow = false) => {
      if (syncNow) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = 0;
        }
        flushDraw(false);
        return;
      }
      if (rafIdRef.current === 0) {
        rafIdRef.current = requestAnimationFrame(() => flushDraw(false));
      }
    },
    [flushDraw]
  );

  const setProgressImperative = useCallback(
    (progress01: number, syncInRaf = false) => {
      const p = Math.max(0, Math.min(1, progress01));
      const total = totalFramesRef.current;
      targetProgressRef.current = p;
      targetFrameRef.current = Math.min(total - 1, Math.round(p * (total - 1)));

      scheduleDraw(syncInRaf);

      const nextAct: 0 | 1 | 2 = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
      if (nextAct !== activeActRef.current) {
        activeActRef.current = nextAct;
        onActChange?.(nextAct);
      }

      const nextClimax = p >= 0.72;
      if (nextClimax !== climaxRef.current) {
        climaxRef.current = nextClimax;
        setAtClimax(nextClimax);
        if (!nextClimax) {
          setSelectedHotspot(null);
        }
      }
    },
    [onActChange, scheduleDraw]
  );

  useEffect(() => {
    const el = containerRef.current as
      | (HTMLDivElement & {
          __setSceneProgress?: (p: number, syncInRaf?: boolean) => void;
        })
      | null;
    if (el) {
      el.__setSceneProgress = setProgressImperative;
    }
  }, [setProgressImperative]);

  useEffect(() => {
    if (actStepManual === null || actStepManual === undefined) return;
    const keyProgress =
      actStepManual === 0 ? 0.04 : actStepManual === 1 ? 0.5 : 0.96;
    setProgressImperative(keyProgress, true);
  }, [actStepManual, setProgressImperative]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    const useMobilePack = window.matchMedia(TOUCH_STICKY_MEDIA_QUERY).matches;
    const tier = useMobilePack ? scene.mobile : scene.desktop;
    const total = tier.frameCount;
    totalFramesRef.current = total;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = tier.width;
      canvas.height = tier.height;
      ctxRef.current = canvas.getContext("2d", { alpha: false });
      if (ctxRef.current) {
        renderBiomimeticSceneFrame(
          ctxRef.current,
          scene.id,
          tier.width,
          tier.height,
          targetProgressRef.current,
          scene.sectionBgHex
        );
      }
    }

    framesRef.current = new Array(total).fill(null);
    loadedMaskRef.current = new Uint8Array(total);
    inFlightMaskRef.current = new Uint8Array(total);
    drawnFrameRef.current = -1;

    const supportsBitmap = typeof createImageBitmap === "function";

    const decodeBlob = async (blob: Blob): Promise<DecodedFrame | null> => {
      if (supportsBitmap) {
        try {
          return await createImageBitmap(blob);
        } catch {
          return null;
        }
      }
      const objUrl = URL.createObjectURL(blob);
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          URL.revokeObjectURL(objUrl);
          resolve(img);
        };
        img.onerror = () => {
          URL.revokeObjectURL(objUrl);
          resolve(null);
        };
        img.src = objUrl;
      });
    };

    const storeDecodedFrame = (idx0: number, decoded: DecodedFrame | null) => {
      if (cancelled || !decoded) {
        if (decoded && "close" in decoded) decoded.close();
        inFlightMaskRef.current[idx0] = 0;
        return;
      }
      if (loadedMaskRef.current[idx0] === 1) {
        if ("close" in decoded) decoded.close();
        inFlightMaskRef.current[idx0] = 0;
        return;
      }
      framesRef.current[idx0] = decoded;
      loadedMaskRef.current[idx0] = 1;
      inFlightMaskRef.current[idx0] = 0;

      const curTarget = targetFrameRef.current;
      const curDrawn = drawnFrameRef.current;
      if (
        curDrawn < 0 ||
        Math.abs(idx0 - curTarget) < Math.abs(curDrawn - curTarget)
      ) {
        scheduleDraw(curDrawn < 0);
      }
    };

    if (useMobilePack) {
      let packState: StreamingMobilePack | null = null;
      let isNearViewport = eager;
      let isOnScreen = eager;
      let activeWorkers = 0;
      let resumeTimer: ReturnType<typeof setTimeout> | null = null;
      let evictTimer: ReturnType<typeof setTimeout> | null = null;

      const permanentStrideSet = new Set<number>();
      for (let i = 0; i < total; i += 3) permanentStrideSet.add(i);
      permanentStrideSet.add(total - 1);

      const isFrameReceived = (
        st: StreamingMobilePack,
        fIdx: number
      ): boolean => {
        if (fIdx < 0 || fIdx >= st.meta.frames.length) return false;
        const entry = st.meta.frames[fIdx];
        return entry.o + entry.l <= st.receivedBytes;
      };

      const scheduleSafeEvict = () => {
        if (evictTimer !== null) return;
        const runEvict = () => {
          evictTimer = null;
          if (cancelled || isNearViewport) return;
          if (performance.now() - globalLastScrollTs < 160) {
            evictTimer = setTimeout(runEvict, 160);
            return;
          }
          for (let i = 0; i < total; i++) {
            if (!permanentStrideSet.has(i) && loadedMaskRef.current[i] === 1) {
              const f = framesRef.current[i];
              if (f && "close" in f) f.close();
              framesRef.current[i] = null;
              loadedMaskRef.current[i] = 0;
            }
          }
          if (
            drawnFrameRef.current >= 0 &&
            !permanentStrideSet.has(drawnFrameRef.current)
          ) {
            drawnFrameRef.current = -1;
            scheduleDraw(true);
          }
        };
        evictTimer = setTimeout(runEvict, 160);
      };

      const countLoadedFrames = (): number => {
        let n = 0;
        const m = loadedMaskRef.current;
        for (let i = 0; i < m.length; i++) n += m[i];
        return n;
      };

      const pickNextFrame = (st: StreamingMobilePack): number => {
        const count = Math.min(total, st.meta.frames.length);
        const target = targetFrameRef.current;
        const passes = isNearViewport ? [15, 6, 3, 1] : [15, 6, 3];
        for (const step of passes) {
          let bestIdx = -1;
          let bestDist = Infinity;
          for (let i = 0; i < count; i += step) {
            if (
              loadedMaskRef.current[i] === 0 &&
              inFlightMaskRef.current[i] === 0 &&
              isFrameReceived(st, i)
            ) {
              const d = Math.abs(i - target);
              if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
              }
            }
          }
          if (bestIdx >= 0) return bestIdx;
        }
        return -1;
      };

      const spawnDecodeWorkers = () => {
        if (cancelled || !packState) return;
        const st = packState;
        const loadedSoFar = countLoadedFrames();
        const activelyScrolling =
          performance.now() - globalLastScrollTs < 110;

        const allowEmergencyBootstrap = isOnScreen && loadedSoFar < 6;
        if (activelyScrolling && !allowEmergencyBootstrap) {
          if (resumeTimer === null) {
            resumeTimer = setTimeout(() => {
              resumeTimer = null;
              spawnDecodeWorkers();
            }, 115);
          }
          return;
        }

        const maxWorkers = activelyScrolling ? 1 : 4;

        const runWorker = async () => {
          activeWorkers++;
          try {
            while (!cancelled) {
              const scrollingNow =
                performance.now() - globalLastScrollTs < 110;
              if (scrollingNow && (!isOnScreen || countLoadedFrames() >= 6)) {
                if (resumeTimer === null) {
                  resumeTimer = setTimeout(() => {
                    resumeTimer = null;
                    spawnDecodeWorkers();
                  }, 115);
                }
                break;
              }
              const nextIdx = pickNextFrame(st);
              if (nextIdx < 0) break;

              inFlightMaskRef.current[nextIdx] = 1;
              const entry = st.meta.frames[nextIdx];
              const view = st.bytes.subarray(entry.o, entry.o + entry.l);
              const sliceBlob = new Blob([view], { type: "image/webp" });
              const bmp = await decodeBlob(sliceBlob);
              storeDecodedFrame(nextIdx, bmp);
            }
          } finally {
            activeWorkers--;
          }
        };

        while (activeWorkers < maxWorkers) {
          const probe = pickNextFrame(st);
          if (probe < 0) break;
          void runWorker();
        }
      };

      let onChunkListener: (() => void) | null = null;
      const startMobilePack = async (urgent: boolean) => {
        const st = await openStreamingMobilePack(
          scene.mobile.packJson,
          scene.mobile.packBin,
          urgent
        );
        if (!st || cancelled) return;
        packState = st;
        onChunkListener = () => {
          if (!cancelled) spawnDecodeWorkers();
        };
        st.listeners.add(onChunkListener);
        spawnDecodeWorkers();
      };

      void startMobilePack(eager);

      const el = containerRef.current;
      let screenIo: IntersectionObserver | null = null;
      let preloadIo: IntersectionObserver | null = null;
      let evictIo: IntersectionObserver | null = null;

      if (el && typeof IntersectionObserver !== "undefined") {
        screenIo = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              isOnScreen = entry.isIntersecting;
            }
          },
          { rootMargin: "10% 0px 10% 0px" }
        );
        screenIo.observe(el);

        preloadIo = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                isNearViewport = true;
                if (evictTimer) {
                  clearTimeout(evictTimer);
                  evictTimer = null;
                }
                if (!packState) {
                  void startMobilePack(true);
                } else {
                  spawnDecodeWorkers();
                }
              }
            }
          },
          { rootMargin: "180% 0px 180% 0px" }
        );
        preloadIo.observe(el);

        evictIo = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) {
                isNearViewport = false;
                scheduleSafeEvict();
              }
            }
          },
          { rootMargin: "320% 0px 320% 0px" }
        );
        evictIo.observe(el);
      }

      return () => {
        cancelled = true;
        if (resumeTimer) clearTimeout(resumeTimer);
        if (evictTimer) clearTimeout(evictTimer);
        if (packState && onChunkListener) {
          packState.listeners.delete(onChunkListener);
        }
        screenIo?.disconnect();
        preloadIo?.disconnect();
        evictIo?.disconnect();
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
        for (const f of framesRef.current) {
          if (f && "close" in f) f.close();
        }
      };
    }

    // DESKTOP 1920x1080 PROGRESSIVE STREAMER
    let desktopStarted = false;
    const startDesktop = async () => {
      if (desktopStarted || cancelled) return;
      desktopStarted = true;

      const loadOne = async (idx0: number): Promise<boolean> => {
        if (
          cancelled ||
          loadedMaskRef.current[idx0] === 1 ||
          inFlightMaskRef.current[idx0] === 1
        ) {
          return true;
        }
        inFlightMaskRef.current[idx0] = 1;
        try {
          const resp = await fetch(
            formatFrameUrl(scene.desktop.dir, idx0 + 1),
            { cache: "force-cache" }
          );
          if (!resp.ok) {
            inFlightMaskRef.current[idx0] = 0;
            return false;
          }
          const bmp = await decodeBlob(await resp.blob());
          storeDecodedFrame(idx0, bmp);
          return Boolean(bmp);
        } catch {
          inFlightMaskRef.current[idx0] = 0;
          return false;
        }
      };

      const firstOk = await loadOne(0);
      if (cancelled || !firstOk) return;

      const pickNext = (): number => {
        const target = targetFrameRef.current;
        for (const step of [18, 6, 2, 1]) {
          let bestIdx = -1;
          let bestDist = Infinity;
          for (let i = 0; i < total; i += step) {
            if (
              loadedMaskRef.current[i] === 0 &&
              inFlightMaskRef.current[i] === 0
            ) {
              const d = Math.abs(i - target);
              if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
              }
            }
          }
          if (bestIdx >= 0) return bestIdx;
        }
        return -1;
      };

      const worker = async () => {
        while (!cancelled) {
          const next = pickNext();
          if (next < 0) break;
          const ok = await loadOne(next);
          if (!ok) break;
        }
      };
      await Promise.all(Array.from({ length: 6 }, () => worker()));
    };

    if (eager) {
      void startDesktop();
    }

    return () => {
      cancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
      for (const f of framesRef.current) {
        if (f && "close" in f) f.close();
      }
    };
  }, [eager, scene, scheduleDraw]);

  const isLightStage = scene.id === "scene-02-implant";

  return (
    <div
      ref={containerRef}
      data-scene-stage={scene.id}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
      style={{ backgroundColor: scene.sectionBgHex }}
      role="img"
      aria-label={scene.title}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none block w-full h-full object-contain transform-gpu"
      />

      {/* Static GPU-cached radial feather vignette — zero per-frame canvas mask recomposition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transform-gpu"
        style={{ background: vignetteOverlayCss }}
      />

      {/* Interactive Anatomical Hotspots at Act 03 Climax (Normalized [u, v] stage coordinates) */}
      {atClimax && scene.hotspots.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-20">
          {scene.hotspots.map((hs) => {
            const isSelected = selectedHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                style={{ left: `${hs.u * 100}%`, top: `${hs.v * 100}%` }}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  aria-label={`Inspect ${hs.label}`}
                  onClick={() =>
                    setSelectedHotspot(isSelected ? null : hs)
                  }
                  className={`group relative flex h-7 w-7 items-center justify-center rounded-full border transition-transform cursor-pointer ${
                    isSelected
                      ? "scale-125 border-[#D4AF6A] bg-[#14473E] shadow-lg"
                      : isLightStage
                      ? "border-[#14473E] bg-[#FDFCF9]/95 hover:scale-110 shadow-md"
                      : "border-[#D4AF6A] bg-[#050A09]/90 hover:scale-110 shadow-md"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected
                        ? "bg-[#D4AF6A]"
                        : isLightStage
                        ? "bg-[#14473E]"
                        : "bg-[#D4AF6A]"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Anatomical Hotspot Popover */}
      {selectedHotspot && (
        <div className="pointer-events-auto absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 z-30 sm:max-w-xs rounded-2xl border border-[#D4AF6A]/45 bg-[#0A1815]/95 p-3.5 text-[#FDFCF9] shadow-2xl">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4AF6A]">
                {selectedHotspot.category}
              </span>
              <h4 className="font-serif text-sm sm:text-base text-[#FDFCF9]">
                {selectedHotspot.label}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setSelectedHotspot(null)}
              aria-label="Close hotspot details"
              className="rounded-full px-2 py-0.5 text-xs text-[#A3B8B3] hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-[#D9EAE6]/90">
            {selectedHotspot.detail}
          </p>
          <div className="mt-2 pt-1.5 border-t border-white/10 text-[10px] font-semibold text-[#4CE6C4]">
            {selectedHotspot.spec}
          </div>
        </div>
      )}

      {reducedMotion && (
        <div className="pointer-events-auto absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-white/25 bg-[#0A1815]/95 px-3.5 py-1.5 text-xs text-white shadow-lg">
          <span className="opacity-85 whitespace-nowrap">Reduced motion:</span>
          {[0, 1, 2].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setProgressImperative(step * 0.48, true)}
              className="rounded-full px-2.5 py-1 font-medium bg-white/15 hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap"
            >
              Act {step + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
