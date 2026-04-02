# Convert HTML to JPEG using Chrome/Edge headless mode
$htmlFile = "ghostwriter-growth-visual.html"
$outputFile = "ghostwriter-growth-visual.jpg"

# Find Chrome or Edge
$chromePath = ""
if (Test-Path "C:\Program Files\Google\Chrome\Application\chrome.exe") {
    $chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
} elseif (Test-Path "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe") {
    $chromePath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
} elseif (Test-Path "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe") {
    $chromePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
} else {
    Write-Host "Chrome or Edge not found. Please install Chrome or use the Node.js method."
    exit 1
}

$htmlFullPath = (Resolve-Path $htmlFile).Path
$outputFullPath = Join-Path (Get-Location) $outputFile

Write-Host "Converting $htmlFile to JPEG..."
Write-Host "Output: $outputFullPath"

& $chromePath --headless --disable-gpu --window-size=1584,396 --screenshot="$outputFullPath" "file:///$($htmlFullPath.Replace('\', '/'))"

if (Test-Path $outputFullPath) {
    Write-Host "✅ Success! Banner saved as $outputFile"
} else {
    Write-Host "❌ Conversion failed. Try using the Node.js method instead."
}