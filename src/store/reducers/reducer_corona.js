import * as actionTypes from '../actions/actionTypes';

const initState = {
    stats: " ",
    country_statistics: " ",
    country_daily_statistics: " "
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_GLOBAL_CORONA_STATS:
            return {
                ...state,
                stats: action.stats
            }
        case actionTypes.GET_COUNTRY_STATISTICS:
            return {
                ...state,
                country_statistics:action.stats
            }
        case actionTypes.GET_COUNTRY_DAILY_STATISTICS:
            return {
                ...state,
                country_daily_statistics:action.stats
            }
        default:
            return state
    }
}
export default reducer;
