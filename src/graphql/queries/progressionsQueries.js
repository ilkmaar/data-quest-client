import { gql } from "@apollo/client/core";

// Queries
const GET_FORAGING_PROGRESS_QUERY = gql`
  query PlayerForagingProgression($playerId: String!, $worldId: String!) {
    playerForagingProgression(playerId: $playerId, worldId: $worldId) {
      currentLevel
      details {
        allResources
        resourcesByCategory
        resourcesByVariety
        resourcesByType
        resourcesByIsland
        resourceQualities
        resourceCategoryQualities
        resourceVarietyQualities
        resourceTypeQualities
      }
      levels {
        id
        name
        description
        threshold
        completed
        progress
      }
      totalLevels
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
