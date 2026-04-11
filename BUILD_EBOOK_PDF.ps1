# Regenerates assets/the-x-writing-playbook.pdf from EBOOK_TEMPLATE_DARK_MINIMAL.html
# Requires Google Chrome or Microsoft Edge (Chromium).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out = Join-Path $root "assets\the-x-writing-playbook.pdf"
$htmlPath = (Resolve-Path (Join-Path $root "EBOOK_TEMPLATE_DARK_MINIMAL.html")).Path
$url = "file:///" + ($htmlPath -replace "\\", "/")
$candidates = @(
  "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
)
$exe = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $exe) {
  Write-Error "Chrome or Edge not found. Install a Chromium browser or export PDF manually (Print → Save as PDF)."
}
Write-Host "Using $exe"
& $exe --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$out" $url
if (-not (Test-Path $out)) { Write-Error "PDF was not created." }
Get-Item $out | Format-List FullName, Length, LastWriteTime
