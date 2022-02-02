export default (state = { show: false, activeArrayIndex: null }, action) => {
    switch (action.type) {
      case "TOGGLE_DELETE_MODAL":
        console.log("Toggle delete modal reducer");
        return {
          ...state,
          show: !state.show,
          activeArrayIndex: action.payload,
        };
      default:
        return state;
    }
  };
  