import { gql } from '@apollo/client/core';

// Fragments
export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        id
        email
        roles {
            name
        }
    }
`;

export const USER_PLAYERS_FRAGMENT = gql`
    fragment UserPlayersFragment on Player {
        id
        name
        world {
            id
            name
        }
    }
`;