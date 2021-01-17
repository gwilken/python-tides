### Tidal Harmonies

[Live demo](https://gwilken.com/tidal/)

## So, What is this?
This web app maps tidal harmonics to MIDI values to facilitate the creation of unique and interesting musical compositions. It provides a number of simple tools to help shape the output: global tempo control, a simple step sequencer, the ability to center and control the range of values around a particular note. It also allows you to output to individual MIDI channels and the ability to send note data or control channel data. You can send data to other software on the host through an internal MIDI bus like Logic Pro X and Pro Tools, or output to an external device like a Euro Rack modular system.

Experience the beauty of the universe expressed through JavaScript and Python!

![screen shot of tidal harmonics webapp](https://github.com/gwilken/tidal/blob/master/src/web/public/images/screen-shot-01.png?raw=true "screen shot 1")

### Select a tide station and explore it's tidal harmonics

![screen shot of tidal harmonics webapp 2](https://github.com/gwilken/tidal/blob/master/src/web/public/images/screen-shot-02.png?raw=true "screen shot 2")


## What are Tidal Harmonics?
Tides are created by the gravitational forces of the Moon and Sun, acting upon the waters of the Earth. Those gravitational forces change as the relative positions of the Earth, Sun, and Moon change. Each of these motions or “constituents” can be described mathmatically as a cosine curve.

More info about the harmonics of tides at [Theory of Tides](https://en.wikipedia.org/wiki/Theory_of_tides)

![tidal harmonic diagram](https://github.com/gwilken/tidal/blob/master/src/web/public/images/harmonic.gif?raw=true)

## Data sources

The tidal harmonic and station data was pulled from a NOAA api: `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/`

The scripts used to scrape, extract, transform, and load can be found in `src/data`
