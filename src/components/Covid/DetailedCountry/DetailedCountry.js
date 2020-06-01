import React, {Component} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as actions from "../../../store/actions";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


class DetailedCountry extends Component {

    componentDidMount() {
        this.props.getCountryDailyStatistics(this.props.match.params.id)
    }


    render() {
        let country_daily_statistics = this.props.country_daily_statistics[0]
        let selectedCountry = ""

        /** HighCharts Options */
        let xAxis = []
        let total_deaths = []
        let total_cases = Object.keys(country_daily_statistics).map(function (key) {
            xAxis.push(key)
            total_deaths.push({name: key, y: country_daily_statistics[key].total_deaths})
            return {name: key, y: country_daily_statistics[key].total_cases};
        });
        Object.keys(this.props.ReducerCorona.country_statistics[0]).filter(key => {
            if (this.props.ReducerCorona.country_statistics[0][key].code == this.props.match.params.id) {
                selectedCountry = this.props.ReducerCorona.country_statistics[0][key]
            }
        })
        const options = {
            chart: {
                type: "spline"
            },
            title: {
                text: "Total Cases"
            },
            yAxis: {
                title: {
                    text: "People"
                },
                min: 0,
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            xAxis: {
                categories: xAxis,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: " people",
                //     headerFormat: '{point.x:%a %d. %b}<br>'
            },
            series: [
                {
                    name: "Total Cases : ",
                    data: total_cases
                },
                {
                    name: "Total Deaths : ",
                    data: total_deaths
                }
            ]
        };

        /** Helper Functions */
        const numberWithCommas = (x) => {
            if (x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                return "Loading"
            }
        }
        return (
            <React.Fragment>
                <div className='card-header text-center p-0 mt-3 mb-2'>
                    <Link
                        to={{ pathname: '/covid-19/'}}
                        key="WORLD">
                        WORLD
                    </Link>
                    <svg className="bi bi-arrow-right-short mb-1" width="2em" height="2em" viewBox="0 0 16 16"
                         fill="currentColor" >
                        <path d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z"/>
                        <path d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z"/>
                    </svg>
                    <Link style={{pointerEvents: "none",color:"gray"}}
                        to={{ pathname: '/covid-19/'+selectedCountry.code}}
                        key={selectedCountry.title}>
                        {selectedCountry.title}
                    </Link>
                </div>
                <div className='row'>
                    <div className='col-sm-3'/>
                    <div className='col-sm-6'>
                        <div className="card m-3">
                            <div className="card-header text-center">
                                <h4>{selectedCountry.title}</h4>
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-sm-6 text-right'>
                                        <h5 style={{color: "#aaa"}}>Total Cases: </h5>
                                    </div>
                                    <div className='col-sm-6 text-left'>
                                        <h5><span
                                            style={{color: "#aaa"}}>{numberWithCommas(selectedCountry.total_active_cases)}</span>
                                        </h5>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6 text-right'>
                                        <h5 style={{color: "green"}}>Total Recovered: </h5>
                                    </div>
                                    <div className='col-sm-6 text-left'>
                                        <h5><span
                                            style={{color: "green"}}>{numberWithCommas(selectedCountry.total_recovered)}</span>
                                        </h5>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6 text-right'>
                                        <h5 style={{color: "red"}}>Total Deaths: </h5>
                                    </div>
                                    <div className='col-sm-6 text-left'>
                                        <h5><span
                                            style={{color: "red"}}>{numberWithCommas(selectedCountry.total_deaths)}</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3'/>
                </div>
                <HighchartsReact highcharts={Highcharts} options={options}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        country_daily_statistics: state.ReducerCorona.country_daily_statistics
    }
}

const mapDispatchToProps = dispatch => ({
    getCountryDailyStatistics: (country_code) => dispatch(actions.get_country_daily_statistics(country_code))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailedCountry);