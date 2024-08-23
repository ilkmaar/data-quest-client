import { gql } from '@apollo/client/core'

const GET_USERS_QUERY = gql`
    query GetUsers {
        users {
            id
            email
            name
            avatar_url
            players {
                id
                name
                world {
                    id
                    name
                }
            }
        }
    }
`

const GET_WORLDS_QUERY = gql`
    query GetWorlds {
        worlds {
            id
            name
            players {
                id
                name
                user {
                    id
                    email
                }
            }
        }
    }
`

const GET_USERS = {
    name: 'Get Users',
    query: GET_USERS_QUERY,
    client: 'authenticated',
}

const GET_WORLDS = {
    name: 'Get Worlds',
    query: GET_WORLDS_QUERY,
    client: 'authenticated',
}

const adminQueries = {
    GET_USERS,
    GET_WORLDS,
}

export default adminQueries;