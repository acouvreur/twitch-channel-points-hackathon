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