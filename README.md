# VLK — Project Page

Static project page for **VLK: Learning Humanoid Loco-Manipulation from
Synthetic Interactions in Reconstructed Scenes**.

## Layout

```
website/
├── index.html              # single-page site
├── css/style.css           # dark cinematic theme
├── js/main.js              # scroll reveal, autoplay-on-visible, bibtex copy
├── videos/                 # all teaser & demo videos (mp4)
└── images/                 # poster jpgs + method overview pngs
```

## Run locally

```bash
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

## Page structure

1. **Hero** — full-bleed looping top-down sweep behind the paper title + authors + CTA buttons.
2. **TL;DR strip** — five headline numbers right under the hero.
3. **Story** — three pillars (Scan → Synthesize → Deploy).
4. **Method** — two large stages with side-by-side video + numbered steps.
5. **Data modes** — six side-by-side mode demos (Apartment + Lab).
6. **Sim deployment** — Lab and Apartment, 2× speed, separate cards.
7. **Real deployment** — five tasks (Navigation, Box Lifting, Multi-Stage, Robustness, Long-Horizon).
8. **Paper** — preprint card + copy-on-click BibTeX block.

## Design

- Single page, no framework. HTML + CSS + a small vanilla JS file.
- Cinematic dark theme. Aurora removed in favour of a real hero-bg video.
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (eyebrows / BibTeX).
- All non-hero videos auto-play when scrolled in, pause when out.
- `prefers-reduced-motion`-aware (animations disabled accordingly).

## Authors

Yen-Jen Wang*¹², Jiaman Li*‡¹, Sirui Chen§¹³, Takara E. Truong§¹³, Pei Xu§¹,
Pieter Abbeel†¹², Rocky Duan†¹, Koushil Sreenath†¹², Angjoo Kanazawa†¹²,
Carmelo Sferrazza†¹, Guanya Shi†¹⁴, C. Karen Liu†¹³.

¹Amazon FAR · ²UC Berkeley · ³Stanford University · ⁴Carnegie Mellon University.

\*Co-first authors. ‡Project lead. §Equal contribution. †Amazon FAR Team Co-Lead.
