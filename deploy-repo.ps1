$ErrorActionPreference = "Stop"
Set-Location "C:\learning\websites\aurum-biomimetic-dental"

if (-not (Test-Path "public/frames/scene-01-hero/mobile-pack-v3.bin")) {
  Write-Host "Generating 3D frame sequences and mobile binary packs..." -ForegroundColor Cyan
  python tools/build_biomimetic_frames.py
}

if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}

git add .
$status = git status --porcelain
if ($status) {
  git commit -m "feat(aurum-dental): build biomimetic 3D scroll-sequence dental atelier and frame packs"
}

Write-Host "Creating public/private GitHub repository 'aurum-biomimetic-dental' via GitHub CLI..." -ForegroundColor Cyan
gh repo create aurum-biomimetic-dental --public --source=. --remote=origin --push

Write-Host "Repository pushed! You can now import 'aurum-biomimetic-dental' in Vercel or run 'npx vercel --prod'." -ForegroundColor Green
