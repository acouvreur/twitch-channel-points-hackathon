### MIDI

- **Windows**
  - Ensure [Midi loop](http://www.tobias-erichsen.de/software/loopmidi.html) is installed
  - configure midi output with name `twitch` or adapt .env configuration value of `PLUGIN_MIDI_OUTPUT`
- **Linux**
  - Virtual midi will be created with no need to install another tool
  - ensure you have `libasound2-dev` installed (or sudo apt install libasound2-dev)
- **Mac OSX**
  - Virtual midi will be created with no need to install another tool

- Then you need to use any music software tool that can understand MIDI inputs and configure whatever effect or melody you want to trigger when viewers redeem rewards having MIDI outputs!
  - For example you can use Ableton Live 11 Suite (or Ableton Lite or Live version 10+). 
    - You can bind any action in Ableton MIDI configuration menu!
    - Enable instruments, effects, melodies, tracks, etc.
