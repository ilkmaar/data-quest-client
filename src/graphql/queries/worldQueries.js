import { gql } from "@apollo/client/core";

const GET_WORLD_STATS = gql`
  query WorldStats($worldId: String!) {
    worldStats(worldId: $worldId) {
      playerCount
      creatureCount
      avgHealth
      activePlayers {
        id
        name
        avatar
        lastActive
      }
      recentEvents {
        id
        icon
        text
        timestamp
      }
    }
  }
`;

const worldQueries = {
  GET_WORLD_STATS: {
    name: "Get World Stats",
    query: GET_WORLD_STATS,
    client: "authenticated",
  },
};

export default worldQueries;
