import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_RECIPES":
      return { ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
