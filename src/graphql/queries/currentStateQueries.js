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
      creature {
        faction {
          name
        }
      }
      x
      y
    }
  }
`

const CURRENT_CREATURES_STATS_QUERY = gql`
  query CreaturesCurrentHealth($worldId: String!) {
    creaturesCurrentHealth(worldId: $worldId) {
      creatureId
      creatureName
      health
      mood
      social
      updatedAt
    }
  }
`

const CURRENT_FACTION_AVERAGES_QUERY = gql`
  factionStats(worldId: $worldId) {
    averageHealth
    averageMood
    averageSocial
    creatureCount
    factionName
  }
`

const CURRENT_PLOT_HEALTH_QUERY = gql`
  currentPlotHealthWithCoords(worldId: $worldId) {
    growthLevel
    lightLevel
    shadowLevel
    stabilityLevel
    x
    y
    updatedAt
  }
`

const CURRENT_LOCATIONS = {
  name: 'Current Locations',
  query: CURRENT_LOCATIONS_QUERY,
  variables: ['worldId'],
  client: 'authenticated',
}

const CURRENT_CREATURES_HEALTH = {
  name: 'Current Creatures Health',
  query: CURRENT_CREATURES_STATS_QUERY,
  variables: ['worldId'],
  client: 'authenticated',
}

const CURRENT_FACTION_AVERAGES = {
  name: 'Current Faction Averages',
  query: CURRENT_FACTION_AVERAGES_QUERY,
  variables: ['worldId'],
  client: 'authenticated',
}

const CURRENT_PLOT_HEALTH = {
  name: 'Current Plot Health',
  query: CURRENT_PLOT_HEALTH_QUERY,
  variables: ['worldId'],
  client: 'authenticated',
}

const currentStateQueries = {
  CURRENT_LOCATIONS,
  CURRENT_CREATURES_HEALTH,
  CURRENT_FACTION_AVERAGES,
  CURRENT_PLOT_HEALTH
}

export default currentStateQueries;