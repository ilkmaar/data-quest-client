import { gql } from '@apollo/client';

const INVITE_USER_TO_WORLD_MUTATION = gql`
    mutation InviteUserToWorld($userId: ID!, $worldId: ID!) {
        inviteUserToWorld(userId: $userId, worldId: $worldId) {
            user {
                id
                email
            }
            world {
                id
                name
            }
        }
    }
`;

const REMOVE_USER_FROM_WORLD_MUTATION = gql`
    mutation RemoveUserFromWorld($userId: ID!, $worldId: ID!) {
        removeUserFromWorld(userId: $userId, worldId: $worldId)
    }
`;

const CREATE_PLAYER_MUTATION = gql`
    mutation CreatePlayer($playerName: String!, $worldId: ID!) {
        createPlayer(playerName: $playerName, worldId: $worldId) {
            player {
                id
                name
                world {
                    id
                    name
                }
            }
        }
    }
`;

const ASSIGN_PLAYER_TO_USER_MUTATION = gql`
    mutation LinkPlayerWithUser($playerId: ID!, $userId: ID!) {
        linkPlayerWithUser(playerId: $playerId, userId: $userId) {
            user_id
            player_id
        }
    }
`;

const UPDATE_USER_ROLE_MUTATION = gql`
    mutation UpdateUserRole($userId: ID!, $roleId: ID!) {
        updateUserRole(userId: $userId, roleId: $roleId) {
            user {
                id
                email
            }
            role {
                id
                name
            }
        }
    }
`;

const adminMutations = {
    CREATE_PLAYER: {
        name: 'Create Player',
        query: CREATE_PLAYER_MUTATION,
        variables: ['playerName', 'worldId'],
        client: 'authenticated',
    },
    ASSIGN_PLAYER_TO_USER: {
        name: 'Assign Player to User',
        query: ASSIGN_PLAYER_TO_USER_MUTATION,
        variables: ['userId', 'playerId'],
        client: 'authenticated',
    },
    UPDATE_USER_ROLE: {
        name: 'Update User Role',
        query: UPDATE_USER_ROLE_MUTATION,
        variables: ['userId', 'roleId'],
        client: 'authenticated',
    },
    INVITE_USER_TO_WORLD: {
        name: 'Invite User to World',
        query: INVITE_USER_TO_WORLD_MUTATION,
        variables: ['userId', 'worldId'],
        client: 'authenticated',
    },
    REMOVE_USER_FROM_WORLD: {
        name: 'Remove User from World',
        query: REMOVE_USER_FROM_WORLD_MUTATION,
        variables: ['userId', 'worldId'],
        client: 'authenticated',
    },
};

export default adminMutations;