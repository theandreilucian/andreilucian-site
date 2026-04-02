# Script to convert HTML to PDF using Microsoft Edge
$htmlFile = "d:\Website\PROIECT_FITNESS.html"
$pdfFile = "d:\Website\PROIECT_FITNESS.pdf"

# Find Edge executable
$edgePath = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe"
}

if (-not (Test-Path $edgePath)) {
    Write-Host "Microsoft Edge not found. Trying alternative method..."
    # Alternative: Use default browser print
    Start-Process $htmlFile
    Write-Host "HTML file opened. Please use browser's Print to PDF feature (Ctrl+P -> Save as PDF)"
    exit
}

# Convert using Edge headless
$htmlUri = "file:///$($htmlFile.Replace('\', '/'))"
Write-Host "Converting $htmlFile to PDF..."
Write-Host "This may take a moment..."

& $edgePath --headless --disable-gpu --print-to-pdf="$pdfFile" "$htmlUri"

if (Test-Path $pdfFile) {
    Write-Host "PDF created successfully: $pdfFile"
} else {
    Write-Host "PDF conversion failed. Trying alternative method..."
    Write-Host "Opening HTML file - please use browser's Print to PDF (Ctrl+P -> Save as PDF)"
    Start-Process $htmlFile
}
