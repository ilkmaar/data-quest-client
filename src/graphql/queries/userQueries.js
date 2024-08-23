import { gql } from '@apollo/client/core';
import { USER_FRAGMENT, USER_PLAYERS_FRAGMENT } from './fragments.js'

// Queries
const GET_CURRENT_USER_QUERY = gql`
    query GetCurrentUser { 
        currentUser {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;

const GET_USER_PLAYERS_QUERY = gql`
    query GetUserPlayers { 
        userPlayers {
            ...UserPlayersFragment
        }
    }
    ${USER_PLAYERS_FRAGMENT}
`;

const userQueries = {
    GET_CURRENT_USER: {
        name: 'Get Current User',
        query: GET_CURRENT_USER_QUERY,
        client: 'authenticated',
    },
    GET_USER_PLAYERS: {
        name: 'Get User Player Worlds',
        query: GET_USER_PLAYERS_QUERY,
        client: 'authenticated',
    },
}

export default userQueries;