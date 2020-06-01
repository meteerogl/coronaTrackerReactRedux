import * as actionTypes from './actionTypes';
import axios from 'axios';

export const get_country_daily_statistics = (country_code) => {
    return dispatch => {
        axios.get( 'https://api.thevirustracker.com/free-api?countryTimeline='+country_code )
            .then( response => {
                if(typeof response.data === "string"){
                    const doc = document.createElement("div");
                    doc.innerHTML = response.data;
                    response.data = JSON.parse( response.data.replace( /<.+/ig,'') )
                }
                dispatch({
                    type: actionTypes.GET_COUNTRY_DAILY_STATISTICS,
                    stats: response.data.timelineitems
                });
            } )
            .catch( error => {
                //dispatch(fetchIngredientsFailed());
            } );
    };
}




export const get_global_corona_stats = () => {
    return dispatch => {
        axios.get( 'https://api.thevirustracker.com/free-api?global=stats' )
            .then( response => {
                if(typeof response.data == "string"){
                    const doc = document.createElement("div");
                    doc.innerHTML = response.data;
                    response.data = JSON.parse( response.data.replace( /\<.+/ig,'') )
                }
                dispatch({
                    type: actionTypes.GET_GLOBAL_CORONA_STATS,
                    stats: response.data.results
                });
            } )
            .catch( error => {
                //dispatch(fetchIngredientsFailed());
            } );
    };
}

export const get_country_statistics = () => {
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
    }
    return dispatch => {
        axios.get( 'https://api.thevirustracker.com/free-api?countryTotals=ALL',headers )
            .then( response => {
                if(typeof response.data == "string"){
                    const doc = document.createElement("div");
                    doc.innerHTML = response.data;
                    response.data = JSON.parse( response.data.replace( /\<.+/ig,'') )
                }
                dispatch({
                    type: actionTypes.GET_COUNTRY_STATISTICS,
                    stats: response.data.countryitems
                });
            } )
            .catch( error => {
                //dispatch(fetchIngredientsFailed());
            } );
    };
}