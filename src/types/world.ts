export interface World {
  world_id: string;
  world_name: string;
  player_id: string;
  player_name: string;
}

export interface WorldStats {
  playerCount: number;
  creatureCount: number;
  avgHealth: number;
  currentTime: Date;
  activePlayers: ActivePlayer[];
  recentEvents: WorldEvent[];
}

export interface ActivePlayer {
  id: string;
  name: string;
  avatar: string;
  lastActive: Date;
}

export interface WorldEvent {
  id: string;
  icon: string;
  text: string;
  timestamp: Date;
}

export interface PlayerProgression {
  currentLevel: number;
  totalLevels: number;
  levels: {
    completed: boolean;
    name: string;
    progress: number;
    threshold: number;
    description: string;
  }[];
  details: {
    allResources: number;
    resourceTypeQualities: number;
    resourcesByCategory: number;
    resourcesByIsland: number;
    resourcesByVariety: number;
  };
}

export interface Quest {
  id: string;
  type: "data" | "foraging" | "crafting" | "social";
  typeLabel: string;
  title: string;
  description: string;
  progress: number;
  worldId: string;
}
