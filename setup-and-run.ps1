$ErrorActionPreference = "Stop"
Set-Location "C:\learning\websites\aurum-biomimetic-dental"

Write-Host "1/4 Installing npm dependencies for Aurum Biomimetic Dental Atelier..." -ForegroundColor Cyan
npm install

Write-Host "2/4 Generating 180 Desktop WebP frames + 144 Mobile V3 Binary Streaming Packs across all 3 scenes..." -ForegroundColor Cyan
python tools/build_biomimetic_frames.py

Write-Host "3/4 Running TypeScript verification..." -ForegroundColor Cyan
npm run lint

Write-Host "4/4 Initializing Git repository & committing initial production release..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}
git add .
git status --short
$hasCommits = git rev-parse --verify HEAD 2>$null
if (-not $hasCommits) {
  git commit -m "feat(aurum-dental): build biomimetic 3D scroll-sequence dental atelier for Vercel"
}

Write-Host "Starting Next.js dev server on http://localhost:3030 ..." -ForegroundColor Green
npm run dev
