# TinyHoopers AP Cost & Cap Simulator

A professional dashboard designed to balance and simulate player builds for TinyHoopers. This tool allows developers and players to define archetype boundaries, manage progression economy, and visualize character potential in real-time.

**🚀 Live Demo: [https://papanouel.github.io/game-stats-sim/](https://papanouel.github.io/game-stats-sim/)**

## 🌟 Key Features

### 1. Build Simulator
- **Real-time Construction**: Experiment with stat allocations using a point-buy system.
- **AP Tracking**: Dynamic calculation of spent vs. available Ability Points (AP).
- **Radar Visualization**: Interactive Radar Chart comparing your current build against the archetype's maximum potential.

### 2. Archetype Potential Portfolios
- **Template Management**: Define "Potential Caps" (maximum achievable levels) for different playstyles (Shooter, Finisher, 3&D, Defender).
- **Stat Specialization**: Fine-tune each of the 15+ individual stats to create unique competitive identities for each archetype.

### 3. AP Economy Configuration
- **Global Settings**: Configure base AP, Level Up rewards, and seasonal bonuses.
- **Balance Testing**: Instantly see how economy changes affect build viability across all templates.

### 4. Portable Configurations
- **Base64 Save System**: Export your entire simulation state (economy, caps, and current build) as a portable string.
- **One-Click Import**: Share configurations with teammates or save multiple balance versions locally.

## 🛠 Tech Stack

- **Framework**: React + TypeScript
- **Styling**: TailwindCSS (Modern Dashboard Design)
- **Charts**: Chart.js (Radar Visualizations)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Actions + GitHub Pages

## 📂 Project Structure

- `/src/components`: UI components (Sidebar, TopBar, Editors, RadarCharts).
- `/src/utils`: Core logic for AP calculations and state initialization.
- `/src/constants`: Default archetype templates and stat metadata.
- `/src/types`: Centralized TypeScript definitions for builds, caps, and economy.

---
*Developed for Imerwise / TinyHoopers balancing and testing.*