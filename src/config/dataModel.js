export const dataModel = {
    nodes: [
        // main entities
        { id: 'factions', label: 'Factions', type: 'entity', start: true },
        { id: 'players', label: 'Players', type: 'entity', start: true },
        { id: 'islands', label: 'Islands', type: 'entity', start: true },

        { id: 'diner', label: 'Diner', type: 'entity' },
        { id: 'medicalBuilding', label: 'Medical Building', type: 'entity' },

        // actions
        { id: 'foraging', label: 'Foraging', type: 'action' },
        { id: 'crafting', label: 'Crafting', type: 'action' },
        { id: 'giving', label: 'Giving', type: 'action' },
        { id: 'treating', label: 'Treating', type: 'action' },

        // records
        { id: 'friendships', label: 'Friendships', type: 'records' },
        { id: 'factionHealth', label: 'Health', type: 'records' },
        { id: 'creatureHealth', label: 'Health', type: 'records' },
        { id: 'islandHealth', label: 'Health', type: 'records' },
        { id: 'factionMood', label: 'Mood', type: 'records' },
        { id: 'creatureMood', label: 'Mood', type: 'records' },
        { id: 'factionSocial', label: 'Social', type: 'records' },
        { id: 'creatureSocial', label: 'Social', type: 'records' },

        // second entities
        { id: 'creatures', label: 'Creatures', type: 'entity' },
        { id: 'resources', label: 'Resources', type: 'entity' },
        { id: 'items', label: 'Items', type: 'entity' },
        { id: 'inventories', label: 'Inventories', type: 'entity' },

        // second actions
        { id: 'tending', label: 'Tending', type: 'action' },
        { id: 'dinerReviews', label: 'Diner Reviews', type: 'action' },

        { id: 'times', label: 'Game Times', type: 'entity' },
        { id: 'patches', label: 'Patches', type: 'entity' },
        { id: 'plots', label: 'Plots', type: 'entity' },
        { id: 'areas', label: 'Areas', type: 'entity' },

        // records
        { id: 'weather', label: 'Weather', type: 'record' },
    ],
    edges: [
        { source: 'players', target: 'foraging', label: 'do' },
        { source: 'players', target: 'crafting', label: 'do' },
        { source: 'players', target: 'giving', label: 'do' },
        { source: 'players', target: 'treating', label: 'do' },
        { source: 'players', target: 'inventories', label: 'has' },

        { source: 'foraging', target: 'resources', label: 'creates' },
        { source: 'resources', target: 'foraging', label: 'come from' },
        { source: 'foraging', target: 'patches', label: 'done at' },
        { source: 'patches', target: 'foraging', label: 'location of' },

        { source: 'resources', target: 'crafting', label: 'used in' },
        { source: 'crafting', target: 'resources', label: 'consumes' },
        { source: 'crafting', target: 'items', label: 'creates' },
        { source: 'items', target: 'crafting', label: 'come from' },

        { source: 'giving', target: 'creatures', label: 'to' },
        { source: 'creatures', target: 'giving', label: 'received' },
        { source: 'items', target: 'giving', label: 'used in' },
        { source: 'giving', target: 'items', label: 'uses' },

        { source: 'inventories', target: 'resources', label: 'contains' },
        { source: 'inventories', target: 'items', label: 'contains' },

        { source: 'players', target: 'friendships', label: 'have' },

        { source: 'areas', target: 'islands', label: 'are in' },
        { source: 'plots', target: 'areas', label: 'are in' },
        { source: 'patches', target: 'plots', label: 'are in' },

        { source: 'factions', target: 'creatures', label: 'belongs to' },
        { source: 'factions', target: 'factionHealth', label: 'has' },
        { source: 'factions', target: 'factionMood', label: 'has' },
        { source: 'factions', target: 'factionSocial', label: 'has' },

        { source: 'creatures', target: 'friendships', label: 'creates' },
        { source: 'creatures', target: 'tending', label: 'do' },
        { source: 'creatures', target: 'dinerReviews', label: 'has' },
        { source: 'creatures', target: 'creatureHealth', label: 'has' },
        { source: 'creatures', target: 'creatureMood', label: 'has' },
        { source: 'creatures', target: 'creatureSocial', label: 'has' },

        { source: 'creatures', target: 'areas', label: 'seen in' },
        { source: 'creatures', target: 'patches', label: 'tending' },
        { source: 'creatures', target: 'diner', label: 'visit' },
        { source: 'creatures', target: 'medicalBuilding', label: 'visit' },

        // records
        { source: 'islands', target: 'weather', label: 'has' },
        { source: 'islands', target: 'diner', label: 'has' },
        { source: 'islands', target: 'medicalBuilding', label: 'has' },
        { source: 'creatures', target: 'creatureHealth', label: 'has' },
        { source: 'islands', target: 'islandHealth', label: 'has' },
    ],
}
