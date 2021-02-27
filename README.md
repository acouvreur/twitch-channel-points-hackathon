# Twitch Channel Points Hackathon

## Install

- Ensure NodeJS v12+ is installed
- create a file `.env` with following template described in `.env-sample` (complete with your account private information)

## Contribute

### Configure VSCode to automatically check and format files with ESLint

- Install ESLint plugin
- Ensure ESLint is enabled and allowed: see ESLint button in the bottom right of the editor
- Go to Settings and search for `code actions` and edit `settings.json`
- Configure as below and save

```json
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true 
    },
    "eslint.validate": ["javascript"]
```

## License

See [License](LICENSE)