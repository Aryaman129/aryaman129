# Aryaman Mohta — Signal Engine

An immersive, scroll-driven portfolio for software engineering, applied AI, mobile machine learning and automation.

## Experience

- A brief, skippable signal-initialization sequence with scrambling/decode typography.
- A persistent metallic 3D form that shifts position, scale and treatment across the sections.
- Kinetic type, outline-to-solid headings, masked reveals and connected atmospheric transitions.
- Project exhibits with CSS/2.5D visualizations for mobile ML, endpoint inspection, semantic retrieval and a student dashboard.
- An interactive engineering loop and skill console.
- Responsive layouts: mobile uses a different composition rather than a scaled desktop.
- Honors reduced-motion preferences and uses a reduced WebGL pixel ratio.

## Stack

- React 18, TypeScript and Vite
- Three.js, React Three Fiber and Drei
- Framer Motion
- Lucide React
- CSS 3D transforms, SVG diagrams and responsive layouts

## Run locally

Requires Node.js 18 or newer.

```sh
npm install
npm run dev
```

Check a production bundle with:

```sh
npm run build
npm run preview
```

## Project links

Project exhibits link to public repositories. Some hosted demos or database services may be inactive; repository source and local setup remain the reference for the implementation.

## Motion and performance

Motion is sequenced around scroll and section visibility rather than running a separate animation on every element. The 3D object uses a low-power renderer and capped device pixel ratio; the page reduces ambient motion for users who prefer reduced motion.
