$workdir = Get-Location

if ($($workdir | Split-Path -Leaf) -ne "data") {
    Write-Host "`e[1;31mError: This script should be run with `e[1;33mclean-tansik-v3\data`e[1;31m as the working directory. Navigate to `e[1;33mclean-tansik-v3\data`e[1;31m and run this script again using `e[1;33mscripts\CategorizeAndConvert.ps1`e[1;31m."
    exit
}

$files = (Get-ChildItem -Path "$workdir\raw").Name
$total = $files.Count
$index = 0

foreach ($file in $files) {
    $index++
    Write-Progress -Activity "Categorizing CSV files" -Status "Processing $file ($index/$total)" -PercentComplete (($index / $total) * 100) -Id 1
    try {
        python.exe .\scripts\categorize.py .\raw\$($file) .\tagged\$($file)
    }
    catch {
        exit
    }
    Write-Host "Categorized .\raw\$($file) and saved to .\tagged\$($file)"
}

Write-Progress -Activity "Categorizing CSV files" -Completed

$tagged = (Get-ChildItem -Path ".\tagged").Name
$total = $tagged.Count
$index = 0

foreach ($file in $tagged) {
    $index++
    Write-Progress -Activity "Converting tagged CSVs to JSON" -Status "Converting $file ($index of $total)" -PercentComplete (($index / $total) * 100)
    Import-Csv .\tagged\$($file) | ConvertTo-Json | Out-File .\json\$($file.Remove(6) + "json")
    Write-Host "Converted .\tagged\$($file) to .\json\$($file)"
}

Write-Progress -Activity "Converting tagged CSVs to JSON" -Completed