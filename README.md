![Twitch Channel Points Hackathon](./channel_points_hackathon.png)

# Awesome Channel Points Manager

**Awesome Channel Points Manager** allows you to quickly setup amazing integrations with your games and broadcaster tools through **Custom Rewards**.

![](./docs/screenshot.png)

Automatically update your **Channel Rewards** when you change your game activity to allow your viewers interact with you specifically for the game you play!

![](./docs/manage_rewards.png)

Create **Custom Rewards** interactions with our **plugins**, each custom reward can trigger multiple event, !

Let your viewer change the weather and/or apply effects on the player in **Minecraft** thanks to our Minecraft plugin, or apply any sound effect like changing your voice pitch, or playing melodies with our **MIDI plugin** and any music software understanding MIDI signals, like **Ableton**!

![](./docs/demo.png)

**Read the [Project Story here](./STORY.md)**

## Plugins

Plugins we developed and how to interact with them :

- [Minecraft](./docs/plugins/Minecraft.md)
- [MIDI](./docs/plugins/MIDI.md)

## Installation

Download the latest release from [here](https://github.com/acouvreur/twitch-channel-points-hackathon/releases).

- Choose the appropriate setup for your operating system:
  - Windows: `.exe` file
  - Linux: `.snap` file
  - Mac OSX: `.dmg` file
- Install it!
  - This software is currently not signed/verified, so some operating system (e.g. Windows) may display an alert telling you that this software could be dangerous for your system. You need to accept the risks and allow the installation.

## Development

To develop with the frontend in hot reloading mode

- `npm install`
- Start the frontend in hot reload `cd frontend && npm start`
- Start the app in dev mode `npm run start:dev` (this packages the App with Electron)

To package the entire app

- `npm install`
- `npm run build`
- `npm run start`

## License

See [License](LICENSE)

## Credits

Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [Flaticon](http://www.flaticon.com)
