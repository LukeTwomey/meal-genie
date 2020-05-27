import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_RECIPES":
      return { ..._.mapKeys(action.payload, "_id") };
    case "FETCH_RECIPE":
      return { ...state, [action.payload.id]: action.payload };
    case "CREATE_RECIPE":
      return { ...state, [action.payload.id]: action.payload };
    case "EDIT_RECIPE":
      return { ...state, [action.payload.id]: action.payload };
    case "DELETE_RECIPE":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
