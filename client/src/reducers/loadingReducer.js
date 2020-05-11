export default (state = { status: true }, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
