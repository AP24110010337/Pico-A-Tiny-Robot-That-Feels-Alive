# Pico — A Tiny Robot That Feels Alive

A modern, interactive product landing page for **Pico**, a small companion robot. Built with Next.js, React, and Three.js.

🔗 **Live Demo:** [Deployed on Vercel](#) *(add your Vercel URL here after deployment)*



---

## ✨ Features

- **Interactive 3D Model Viewer** — Click "View in 3D" to explore a procedural 3D Pico robot built with Three.js. Drag to rotate, scroll to zoom, right-click to pan.
- **2D Animated Robot (SVG)** — Eye-tracking Pico mascot that follows your cursor and reacts to clicks with different expressions.
- **Scroll-driven Storytelling** — GSAP-powered scroll animations that reveal the product narrative.
- **Animated Sections** — Hero, Product Showcase, Features, Use Cases, and Pricing — all with smooth Framer Motion transitions.
- **Scroll-to-Top Button** — Floating button appears after scrolling past the midpoint.
- **Fully Responsive** — Works across desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions |
| [GSAP](https://gsap.com/) | Scroll-driven animations |
| [Three.js](https://threejs.org/) | 3D rendering engine |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | Three.js helpers (OrbitControls, Float, Environment) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Home page (assembles all sections)
│   └── globals.css         # Global styles & design tokens
├── components/
│   ├── PicoRobot.tsx       # 2D SVG robot with eye tracking
│   ├── Pico3D.tsx          # Procedural 3D robot (Three.js)
│   ├── Pico3DViewer.tsx    # Full-screen 3D viewer modal
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ScrollStory.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── UseCasesSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── GlowButton.tsx      # Reusable animated button
│       ├── SectionHeading.tsx   # Section title component
│       └── ScrollToTop.tsx      # Floating scroll-to-top button
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/AP24110010337/aec.git
cd aec

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---


## 📸 Key Highlights

### Interactive 3D Viewer
Users can click the **"View in 3D"** button in the Hero section to open a full-screen 3D model viewer. The 3D robot is built procedurally using Three.js primitives — no external model files are needed.

### Eye-Tracking Robot
The 2D SVG Pico robot follows the user's cursor with smooth interpolation, creating an engaging, alive-feeling mascot.

### Smooth Animations
All sections use Framer Motion for entrance animations and GSAP for scroll-driven effects, creating a premium, polished feel.




