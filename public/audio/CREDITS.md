# Audio credits

## ambient-loop.mp3

- **Title:** c-beams
- **Author:** John Bartmann
- **License:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) (public domain dedication, no attribution required)
- **Source:** [John Bartmann — 100 Ambient Atmospheric Soundtracks: Straylight Drones Collection](https://freemusicarchive.org/music/John_Bartmann/100-ambient-atmospheric-soundtracks-straylight-drones-collection/c-beams-master)
- **Archive copy:** [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:John_Bartmann_-_c-beams-master.ogg)

### Processing

Derived from the original 4:04 stereo master.

1. Cut 34 s → 154 s from the original.
2. Crossfade the last 4 s into the first 4 s (`qsin` curve) to remove the seam, producing a gapless 116 s loop.
3. Loudness normalise to −20 LUFS integrated, −2 dBTP ceiling (linear mode, measured pass).
4. Encode MP3: stereo, 44.1 kHz, LAME VBR `-q:a 7` (~51 kbps), 743 KB.

Measured result: 116.000 s, −20.0 LUFS, true peak −7.2 dBFS, sample-to-sample jump across the loop seam 186/32768 (well inside content variation, no click).