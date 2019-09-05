const initialState = {recipes: []}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PLAN_MEALS':

            var shuffledRecipes = [...action.payload];
            var m = shuffledRecipes.length, t, i;

            // While there remain elements to shuffle…
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = shuffledRecipes[m];
                shuffledRecipes[m] = shuffledRecipes[i];
                shuffledRecipes[i] = t;
            }

            return { ...state, recipes: shuffledRecipes.slice(0,2) };
        default:
            return state;
    }
}