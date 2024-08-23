// src/graphql/queries/index.js
import userQueries from './userQueries';
import adminQueries from './adminQueries.js'
import adminMutations from '../mutations/adminMutations.js'

const queries = {
    ...userQueries,
    ...adminQueries,
    ...adminMutations
}

export default queries