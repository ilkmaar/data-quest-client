import { gql } from "@apollo/client/core";

const CURRENT_LOCATIONS_QUERY = gql`
  query CurrentLocations($worldId: String!) {
    currentPlayerLocations(worldId: $worldId) {
      playerName
      time {
        game_time_number
      }
      x
      y
      updatedAt
    }

    currentCreatureLocations(worldId: $worldId) {
      creatureId
      creatureName
      faction
      x
      y
    }
  }
`;

const CURRENT_CREATURES_STATS_QUERY = gql`
  query CreaturesCurrentStats($worldId: String!) {
    creaturesCurrentStats(worldId: $worldId) {
      creatures {
        creatureId
        faction
        health
        mood
        social
        creatureName
        updatedAt
      }
      factions {
        avg_health
        avg_mood
        avg_social
        faction_name
      }
    }
  }
`;

const CURRENT_FACTION_STATS_QUERY = gql`
  query CurrentFactionAverages($worldId: String!) {
    factionStats(worldId: $worldId) {
      averageHealth
      averageMood
      averageSocial
      creatureCount
      factionName
    }
  }
`;

const CURRENT_PLOT_HEALTH_QUERY = gql`
  query CurrentPlotHealth($worldId: String!) {
    currentPlotHealthWithCoords(worldId: $worldId) {
      growthLevel
      lightLevel
      shadowLevel
      stabilityLevel
      x
      y
      updatedAt
    }
  }
`;

const CURRENT_LOCATIONS = {
  name: "Current Locations",
  query: CURRENT_LOCATIONS_QUERY,
  variables: ["worldId"],
  client: "authenticated",
};

const CURRENT_CREATURES_STATS = {
  name: "Current Creatures Health",
  query: CURRENT_CREATURES_STATS_QUERY,
  variables: ["worldId"],
  client: "authenticated",
};

const CURRENT_FACTION_STATS = {
  name: "Current Faction Averages",
  query: CURRENT_FACTION_STATS_QUERY,
  variables: ["worldId"],
  client: "authenticated",
};

const CURRENT_PLOT_HEALTH = {
  name: "Current Plot Health",
  query: CURRENT_PLOT_HEALTH_QUERY,
  variables: ["worldId"],
  client: "authenticated",
};

const currentStateQueries = {
  CURRENT_LOCATIONS,
  CURRENT_CREATURES_STATS,
  CURRENT_FACTION_STATS,
  CURRENT_PLOT_HEALTH,
};

export default currentStateQueries;
