import { gql } from "@apollo/client/core";

// Queries
const GET_FORAGING_PROGRESS_QUERY = gql`
  query PlayerForagingProgression($playerId: String!, $worldId: String!) {
    playerForagingProgression(playerId: $playerId, worldId: $worldId) {
      currentLevel
      totalLevels
      levels {
        completed
        name
        progress
        threshold
        description
      }
      details {
        allResources
        resourceTypeQualities
        resourcesByCategory
        resourcesByIsland
        resourcesByVariety
      }
    }
  }
`;

const progressQueries = {
  GET_FORAGING_PROGRESS: {
    name: "Get Foraging Progress",
    query: GET_FORAGING_PROGRESS_QUERY,
    client: "authenticated",
  },
};

export default progressQueries;
