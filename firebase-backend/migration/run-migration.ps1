# Firebase Image Migration - PowerShell Script
# This script reads the migration commands and executes them automatically

Write-Host "🚀 Firebase Image Migration - PowerShell Script" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Check if gsutil is available
try {
    $gsutilVersion = gsutil --version 2>$null
    if ($gsutilVersion) {
        Write-Host "✅ gsutil is available" -ForegroundColor Green
    } else {
        Write-Host "❌ gsutil is not available. Please install Google Cloud SDK first." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ gsutil is not available. Please install Google Cloud SDK first." -ForegroundColor Red
    exit 1
}

# Read migration commands from file
$commandsFile = "migration-commands-fixed.txt"
if (-not (Test-Path $commandsFile)) {
    Write-Host "❌ Migration commands file not found: $commandsFile" -ForegroundColor Red
    exit 1
}

Write-Host "📖 Reading migration commands from: $commandsFile" -ForegroundColor Yellow
$commands = Get-Content $commandsFile

Write-Host "📊 Found $($commands.Count) commands to execute" -ForegroundColor Yellow
Write-Host ""

# Ask for confirmation
Write-Host "⚠️  This will migrate ALL images to their proper folders." -ForegroundColor Yellow
Write-Host "   Are you sure you want to continue? (y/N)" -ForegroundColor Yellow
$confirmation = Read-Host

if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "❌ Migration cancelled by user" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🔄 Starting migration..." -ForegroundColor Green
Write-Host ""

# Execute commands with progress
$current = 0
$total = $commands.Count

foreach ($command in $commands) {
    $current++
    $percent = [math]::Round(($current / $total) * 100, 1)
    
    Write-Host "[$current/$total] ($percent%) Executing: $command" -ForegroundColor Cyan
    
    try {
        # Execute the command
        Invoke-Expression $command
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Success" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed (Exit code: $LASTEXITCODE)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Error: $_" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "🎉 Migration completed!" -ForegroundColor Green
Write-Host "📊 Processed $total commands" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Enter to exit..."
Read-Host
