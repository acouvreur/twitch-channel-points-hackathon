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

### Ableton

- Ensure Ableton Live 11 Suite (or Ableton Lite or Live version 10+) is installed
- Windows
  - Ensure [Midi loop](http://www.tobias-erichsen.de/software/loopmidi.html) is installed
  - configure midi output with name `twitch` or adapt .env configuration value of `PLUGIN_MIDI_OUTPUT`
- Linux
  - Virtual midi will be created with no need to install another tool
  - ensure you have `libasound2-dev` installed (or sudo apt install libasound2-dev)
- Mac OSX
  - Virtual midi will be created with no need to install another tool

## License

See [License](LICENSE)
