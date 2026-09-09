# deploy.ps1 — Build and deploy to Cloudflare Workers
# Reads env vars from .env.production so nothing is hardcoded in wrangler.jsonc

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# -- 1. Load .env.production ---------------------------------------------------
$envFile = Join-Path $PSScriptRoot ".env.production"
if (-not (Test-Path $envFile)) {
    Write-Error ".env.production not found at $envFile"
    exit 1
}

$envVars = @{}
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -match '^\s*#' -or $line -eq '') { return }
    if ($line -match '^([^=]+)=(.*)$') {
        $envVars[$Matches[1].Trim()] = $Matches[2].Trim()
    }
}

$apiBaseUrl = $envVars["NEXT_PUBLIC_API_BASE_URL"]
if (-not $apiBaseUrl) {
    Write-Error "NEXT_PUBLIC_API_BASE_URL is not set in .env.production"
    exit 1
}

Write-Host "OK  NEXT_PUBLIC_API_BASE_URL = $apiBaseUrl" -ForegroundColor Cyan

# -- 2. Build ------------------------------------------------------------------
Write-Host "`nBuilding..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# -- 3. Deploy with var injected -----------------------------------------------
Write-Host "`nDeploying to Cloudflare Workers..." -ForegroundColor Yellow
npx wrangler deploy --var "NEXT_PUBLIC_API_BASE_URL:$apiBaseUrl"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`nDeploy complete!" -ForegroundColor Green
