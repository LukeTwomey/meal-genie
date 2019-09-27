export default (state = { show: false, activeArrayIndex: null }, action) => {
    switch (action.type) {
        case 'TOGGLE_SEARCH_MODAL':
            console.log("No, you got me");
            return {
                ...state,
                show: !state.show,
                activeArrayIndex: action.payload
            };
        default:
            return state;
    }
}