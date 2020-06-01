import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class ListItem extends Component {




    render() {
        const country_statistics = this.props.country_statistics[0]
        let result = Object.keys(country_statistics).map(function(key) {
            return country_statistics[key];
        });
        const list = result.map((country)=> {
            if(typeof country === "object"){
                return (
                    <tr key={country.ourid}>
                        <td>{country.ourid}</td>
                        <td>
                            <Link
                                to={{ pathname: '/covid-19/'+country.code}}
                                key={country.code}>
                                {country.title}
                            </Link>
                        </td>
                        <td>{country.total_cases}</td>
                        <td>{country.total_deaths}</td>
                        <td>{country.total_new_cases_today}</td>
                        <td>{country.total_new_deaths_today}</td>
                        <td>{country.total_recovered}</td>
                        <td>{country.total_serious_cases}</td>
                    </tr>
                )
            }
        })

        return (
            <React.Fragment>
                {list}
            </React.Fragment>

        )
    }


}

export default ListItem