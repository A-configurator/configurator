# Скрипт для автоматического коммита и пуша изменений
# Использование: .\scripts\commit-and-push.ps1 "Описание изменений"

param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)

Write-Host "🔄 Проверка изменений..." -ForegroundColor Cyan
$status = git status --porcelain

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "❌ Нет изменений для коммита" -ForegroundColor Yellow
    exit 0
}

Write-Host "📝 Добавление файлов..." -ForegroundColor Cyan
git add .

Write-Host "💾 Создание коммита: $Message" -ForegroundColor Cyan
git commit -m $Message

if ($LASTEXITCODE -eq 0) {
    Write-Host "🚀 Отправка в GitHub..." -ForegroundColor Cyan
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Изменения успешно отправлены в GitHub!" -ForegroundColor Green
    } else {
        Write-Host "❌ Ошибка при отправке. Проверьте аутентификацию." -ForegroundColor Red
    }
} else {
    Write-Host "❌ Ошибка при создании коммита" -ForegroundColor Red
}
