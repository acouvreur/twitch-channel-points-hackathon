# Twitch Channel Points Hackathon

## Install

- You need to be Twitch Affiliate or Partner to be able to use this application 
- Configure an application [here](https://dev.twitch.tv/console/apps)
  - Ensure callback URL is `http://localhost:8080/auth/callback`
- Ensure NodeJS v12+ is installed
- Create a file `.env` following template described in `.env-sample` (complete with your account private information)
- Open a terminal in this directory and
  - run `npm i` (if not already run)
  - then run `npm start`
- Navigate to [auth](http://localhost:8080/auth) to generate application credentials. *WARNING* - credentials are store in the file `token.json`: DO NOT SHARE IT WITH ANYONE

## Plugins

### Minecraft

TODO
## License

See [License](LICENSE)
