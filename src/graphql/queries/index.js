// src/graphql/queries/index.js
import userQueries from "./userQueries";
import adminQueries from "./adminQueries.js";
import adminMutations from "../mutations/adminMutations.js";
import currentStateQueries from "./currentStateQueries";
import progressQueries from "./progressQueries";

const queries = {
  ...userQueries,
  ...adminQueries,
  ...adminMutations,
  ...currentStateQueries,
  ...progressQueries,
};

export default queries;
