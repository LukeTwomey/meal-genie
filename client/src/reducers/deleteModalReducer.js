export default (state = { show: false, activeRecipeId: null }, action) => {
    switch (action.type) {
      case "TOGGLE_DELETE_MODAL":
        return {
          ...state,
          show: !state.show,
          activeRecipeId: action.payload,
        };
      default:
        return state;
    }
  };
  