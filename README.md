# ⚡ IGNITION

Ignition is a premium, high-fidelity Web3 Tap-to-Earn (T2E) game built on the Stellar Blockchain. Designed as a "Neural Link" interface, players extract "Lumen Dust" via a reactive, pulsing Hyper-Core to drive a compounding digital economy.
## 🎯 Project Vision

In the 2026 Stellar ecosystem, community engagement is the primary metric for success. Ignition is built from the ground up to be "Contributor-First." We prioritize a UI-First approach to maximize community "Maintenance Points" by providing a low-friction, high-fidelity shell that developers can immediately contribute to.
## 🏗️ Technical Architecture (Turborepo)

Ignition utilizes a monorepo structure powered by pnpm and Turborepo to ensure strict type safety and modularity across the stack:

  - apps/web (React + Phaser.js): The primary game interface. We use Phaser for high-performance canvas rendering of game assets and React for the glass-morphic HUD and wallet integration.

  - apps/api (NestJS): A robust backend handling user persistence, leaderboard logic, and tap validation.

  - packages/shared: The "Shared Brain." This package contains the unified ICoreState interfaces and game constants. This ensures that the frontend UI and backend validation logic are always in 100% sync.

## 🛠️ Tech Stack

    Blockchain: Stellar SDK + Freighter Wallet Integration.

    Frontend: Vite, React, Tailwind CSS (v4), Phaser.js.

    Backend: NestJS (TypeScript), PostgreSQL.

    Monorepo Tools: Turborepo, pnpm.

# 🚀 Quick Start

# Install dependencies from the root
pnpm install

# Start the full ecosystem (API + Web + Shared)
pnpm dev