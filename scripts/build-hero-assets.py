#!/usr/bin/env python3
"""Builds public/hero/hero.mp4, hero.webm, poster.png, public/portrait-bust.webp and og.jpg.
Needs ffmpeg + Pillow.   Usage: python scripts/build-hero-assets.py INTRO.mp4 PORTRAIT.jpg
The clip is cropped only (character is centred in the 1280x720 frame, full body kept),
never trimmed, retimed or looped; the background stays untouched (white, blended with CSS multiply)."""
import subprocess, sys, pathlib
from PIL import Image
root = pathlib.Path(__file__).resolve().parent.parent
video, photo = sys.argv[1], sys.argv[2]
CROP = "crop=600:720:347:0"
(root / "public/hero").mkdir(parents=True, exist_ok=True)
def run(a): subprocess.run(["ffmpeg", "-y", "-v", "error", *a], check=True)
run(["-i", video, "-vf", CROP, "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(root / "public/hero/hero.mp4")])
run(["-i", video, "-vf", CROP, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-deadline", "good",
     "-cpu-used", "2", "-pix_fmt", "yuv420p", "-c:a", "libopus", "-b:a", "80k", str(root / "public/hero/hero.webm")])
img = Image.open(photo).convert("RGB"); w, h = img.size; ch = min(h, int(w * 1.25))
img.crop((0, 0, w, ch)).resize((480, 600), Image.LANCZOS).save(root / "public/portrait-bust.webp", quality=88)
run(["-ss", "3", "-i", video, "-vf", CROP, "-frames:v", "1", str(root / "public/hero/poster.png")])
fr = Image.open(root / "public/hero/poster.png").convert("RGB").resize((525, 630))
og = Image.new("RGB", (1200, 630), (244, 242, 238)); og.paste(fr, (337, 0)); og.save(root / "public/og.jpg", quality=88)
print("assets built")
