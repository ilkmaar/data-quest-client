# Data Quest Client

A Vue.js-based prototype client for "Isles of Ilkmaar", an educational game that combines narrative gameplay with data exploration and visualization.

![Isles of Ilkmaar](/public/images/ILKMAAR_COVER_IMAGE.png)

## Overview

This client application was developed as part of an NSF-funded project to prototype data visualizations and interfaces for an educational game world. It provides capabilities for:

- Authenticating users via Discord or email/password (with special study login support)
- Exploring game data through interactive queries
- Visualizing game statistics with charts and plots
- Displaying "social media-style" game narratives that blend storytelling with data
- Monitoring creature health, social interactions, and moods
- Viewing an interactive game world map

## Features

### Authentication

The client supports multiple authentication methods:
- Discord OAuth integration
- Email/password login
- Special study login functionality for research participants

### Data Exploration

- Interactive query builder for exploring game data
- Variable management for parameterized queries
- Results displayed in formatted tables

### Data Visualization

The application includes multiple data visualization components:
- Creature health strip plots
- Faction-based statistics
- Game world maps showing player and creature locations
- Foraging progress charts
- Health alerts and monitoring

### Dashboard and Social Elements

- Social media-inspired posts mixing narrative and data
- Creature statistics and health monitoring
- Interactive polls and surveys
- Data story cards that combine game narrative with data insights

## Technical Stack

- **Frontend Framework**: Vue.js 3 with Vue Router and Vuex
- **Build System**: Vite
- **Data Visualization**: vue-data-ui 
- **API Communication**: Apollo Client (GraphQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS + custom styles

## Getting Started

### Prerequisites

- Node.js (recommended: v16+)
- npm (recommended: v8+)

### Installation

```sh
# Install dependencies
npm install
```

### Development

```sh
# Start development server with hot-reload
npm run dev
```

### Building for Production

```sh
# Compile and minify for production
npm run build
```

### Preview Production Build

```sh
# Preview the production build
npm run preview
```

## Project Structure

- `/src/components/`: Vue components organized by feature area
  - `/admin/`: Administrative tools and world management
  - `/auth/`: Authentication components
  - `/dashboard/`: Data visualization and player dashboards
  - `/DataWorkspace/`: Data query and exploration tools
  - `/game/`: Game world interface components
- `/src/composables/`: Reusable logic and feature hooks
- `/src/graphql/`: GraphQL queries and mutations
- `/src/services/`: Service layer for external APIs
- `/src/store/`: Vuex store modules
- `/src/views/`: Top-level page components

## Research Context

This client was developed to prototype interfaces that blend gameplay with data exploration, supporting research into educational games that teach data literacy skills. The social media-inspired presentation of game data explores innovative ways to make data engaging and relevant within a narrative context.

The prototype specifically focuses on:
- Making data visualizations accessible in an educational game context
- Embedding data exploration within narrative gameplay
- Supporting player progression through data-driven quests
- Enabling collaborative data interpretation through social features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This material is based upon work supported by the National Science Foundation under Grant No. 2214516. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.