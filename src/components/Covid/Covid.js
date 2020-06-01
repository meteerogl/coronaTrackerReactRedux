import React, {Component} from 'react';
import ListCountries from "./ListCountries/ListCountries";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

class Covid extends Component {


    componentDidMount() {
        this.props.getGlobalCoronaStats()
        this.props.getAllCountryStatistics()
    }

    render() {
        const numberWithCommas = (x) => {
            if (x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                return "Loading"
            }
        }
        let listBlock = (
            <div className='text-center'>
                <h1>Loading...</h1>
            </div>
        );
        if (this.props.country_statistics !== " ") {
            listBlock = <ListCountries country_statistics={this.props.country_statistics}></ListCountries>
        }

        return (
            <React.Fragment>
                <div className='container' style={{paddingTop: "40px"}}>
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>COVID-19 CORONAVIRUS PANDEMIC</h2>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-sm-6 text-right'>
                                    <h4 style={{color: "#aaa"}}>Total Cases: </h4>
                                </div>
                                <div className='col-sm-6 text-left'>
                                    <h4><span
                                        style={{color: "#aaa"}}>{numberWithCommas(this.props.global_data[0].total_cases)}</span>
                                    </h4>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 text-right'>
                                    <h4 style={{color: "green"}}>Total Recovered: </h4>
                                </div>
                                <div className='col-sm-6 text-left'>
                                    <h4><span
                                        style={{color: "green"}}>{numberWithCommas(this.props.global_data[0].total_recovered)}</span>
                                    </h4>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 text-right'>
                                    <h4 style={{color: "red"}}>Total Deaths: </h4>
                                </div>
                                <div className='col-sm-6 text-left'>
                                    <h4><span
                                        style={{color: "red"}}>{numberWithCommas(this.props.global_data[0].total_deaths)}</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {listBlock}
                </div>
            </React.Fragment>
        )

    }
}

const mapStateToProps = state => {
    return {
        ...state,
        global_data: state.ReducerCorona.stats,
        country_statistics: state.ReducerCorona.country_statistics
    }
}

const mapDispatchToProps = dispatch => ({
    getGlobalCoronaStats: () => dispatch(actions.get_global_corona_stats()),
    getAllCountryStatistics: () => dispatch(actions.get_country_statistics())
})

export default connect(mapStateToProps, mapDispatchToProps)(Covid);


