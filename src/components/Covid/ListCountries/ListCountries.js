import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import DetailedCountry from "../DetailedCountry/DetailedCountry";
import {Table, Column, HeaderCell, Cell} from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';


class ListCountries extends Component {
    constructor(props) {
        super(props);
        const country_statistics = this.props.country_statistics[0]
        let data = Object.keys(country_statistics).map(function (key) {
            if (typeof country_statistics[key] === "string") {
                return {}
            }
            return country_statistics[key];
        });

        this.state = {
            addColumn: false,
            data: data,
            sortColumn: "total_cases",
            sortType: "desc"
        };
        this.handleSortColumn = this.handleSortColumn.bind(this);
    }

    handleSortColumn(sortColumn, sortType) {
        this.setState({
            loading: true
        });

        setTimeout(() => {
            this.setState({
                sortColumn,
                sortType,
                loading: false
            });
        }, 800);
    }

    getData() {
        console.log(this.state)
        const {data, sortColumn, sortType} = this.state;

        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    }

    render() {
        const CountryNameCell = ({ rowData, dataKey, ...props }) => {
            function handleAction() {
                alert(`id:${rowData["code"]}`);
            }
            console.log(rowData)
            return (
                <Cell  {...props} className="link-group">
                    <Link
                        to={{ pathname: '/covid-19/'+rowData["code"]}}
                        key={rowData[dataKey]}>
                        {rowData[dataKey]}
                    </Link>
                </Cell>
            );
        };


        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/covid-19/" render={() => (
                        <div className='mt-3'>
                            <Table
                                height={543}
                                data={this.getData()}
                                sortColumn={this.state.sortColumn}
                                sortType={this.state.sortType}
                                onSortColumn={this.handleSortColumn}
                                loading={this.state.loading}
                                onRowClick={data => {
                                    console.log(data);
                                }}>

                                <Column width={180} sortable>
                                    <HeaderCell>Country Name</HeaderCell>
                                    <CountryNameCell dataKey="title"/>
                                </Column>

                                <Column width={130} sortable>
                                    <HeaderCell>Total Cases</HeaderCell>
                                    <Cell dataKey="total_cases"/>
                                </Column>

                                <Column width={160} sortable>
                                    <HeaderCell>New Cases Today</HeaderCell>
                                    <Cell dataKey="total_new_cases_today"/>
                                </Column>

                                <Column width={170} sortable>
                                    <HeaderCell>New Deaths Today</HeaderCell>
                                    <Cell dataKey="total_new_deaths_today"/>
                                </Column>

                                <Column width={130} sortable>
                                    <HeaderCell>Total Deaths</HeaderCell>
                                    <Cell style={{backgroundColor:"#ff3333",color:"white"}} dataKey="total_deaths"/>
                                </Column>

                                <Column width={160} sortable>
                                    <HeaderCell>Total Recovered</HeaderCell>
                                    <Cell style={{backgroundColor:"green",color:"white"}} dataKey="total_recovered"/>
                                </Column>

                                <Column width={170} sortable>
                                    <HeaderCell>Total Serious Cases</HeaderCell>
                                    <Cell dataKey="total_serious_cases" />
                                </Column>

                            </Table>

                        </div>

                        /**
                         <table className="table">
                         <thead>
                         <tr>
                         <th>#</th>
                         <th>Country Name</th>
                         <th>Total Cases</th>
                         <th>Total Deaths</th>
                         <th>New Cases Today</th>
                         <th>New Deaths Today</th>
                         <th>Total Recovered</th>
                         <th>Total Serious Cases</th>
                         </tr>
                         </thead>
                         <tbody>
                         <ListItem country_statistics={this.props.country_statistics}></ListItem>
                         </tbody>
                         </table>
                         */
                    )}/>
                    <Route path=":id" component={DetailedCountry}/>
                </Switch>
                <Route path="/covid-19/:id" component={DetailedCountry}/>
            </React.Fragment>
        )

    }
}

export default ListCountries;


