import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import { Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home'
import Covid19 from "./components/Covid/Covid";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/covid-19" component={Covid19}/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
