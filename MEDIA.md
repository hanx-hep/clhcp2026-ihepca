# Web recordings

The two CA recordings originate from `ihepca-prelaunch-2026/public/` in the
parent workspace. Originals remain unchanged there. The copies in this project
are optimized for GitHub Pages: H.264 High / Level 4.1, yuv420p, 1264×1536
(the original 79:96 aspect ratio), 24 fps, no audio, and a front-loaded MP4
`moov` index (`+faststart`) for progressive playback.

To regenerate a web copy from its original recording:

```bash
ffmpeg -i ORIGINAL.mp4 -an \
  -vf 'fps=24,scale=1264:1536:flags=lanczos' \
  -c:v libx264 -preset slow -crf 26 -maxrate 2000k -bufsize 4000k \
  -profile:v high -level:v 4.1 -pix_fmt yuv420p -g 48 \
  -movflags +faststart OUTPUT.mp4
ffmpeg -ss 1 -i OUTPUT.mp4 -frames:v 1 -c:v libwebp -quality 85 POSTER.webp
```

`SlidevVideo` pauses off-slide playback. Relative bound URLs work at both the
local site root and `/clhcp2026-ihepca/`; the URL version identifies optimized
files to avoid reusing cached originals. Posters provide visible content while
buffering or when playback fails, and each slide has an **Open video** fallback.
