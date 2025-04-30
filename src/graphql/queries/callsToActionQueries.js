import { gql } from "@apollo/client/core";

const CREATURES_NEEDING_HELP_QUERY = gql`
  creaturesNeedingHelp(threshold: $threshold, worldId: $creaturesNeedingHelpWorldId2) {
    social
    mostCriticalStat
    mood
    health
    factionName
    creatureName
  }
}
`;

const CREATURES_NEEDING_HELP = {
  name: "Creatures Needing Help",
  query: CREATURES_NEEDING_HELP_QUERY,
  variables: ["threshold", "worldId"],
  client: "authenticated",
};

const callToActionQueries = {
  CREATURES_NEEDING_HELP,
};

export default callToActionQueries;
