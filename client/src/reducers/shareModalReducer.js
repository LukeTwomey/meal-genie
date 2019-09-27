export default (state = { show: false }, action) => {
    switch (action.type) {
        case 'TOGGLE_SHARE_MODAL':
            return {
                ...state,
                show: !state.show
            };
        default:
            return state;
    }
}