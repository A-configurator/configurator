# Автоматическая работа с GitHub

## Настройка аутентификации (один раз)

### Вариант 1: GitHub CLI (рекомендуется)
1. Скачайте GitHub CLI: https://cli.github.com/
2. Установите его
3. Выполните: `gh auth login`
4. Выберите GitHub.com → HTTPS → аутентифицируйтесь

### Вариант 2: Personal Access Token
1. Создайте токен: https://github.com/settings/tokens
2. Выберите права: `repo` (полный доступ к репозиториям)
3. Скопируйте токен
4. При первом push Git запросит пароль - введите токен вместо пароля
5. Windows сохранит его в Credential Manager

### Вариант 3: SSH ключи
1. Создайте SSH ключ: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Добавьте ключ в GitHub: https://github.com/settings/keys
3. Измените remote на SSH:
   ```bash
   git remote set-url origin git@github.com:A-configurator/arizona-rp-gear-configurator.git
   ```

## Как я буду работать с кодом

После настройки аутентификации я смогу:
1. ✅ Изменять файлы в проекте
2. ✅ Делать коммиты с понятными сообщениями
3. ✅ Пушить изменения в GitHub автоматически

Просто скажите что нужно сделать, и я выполню все шаги!
