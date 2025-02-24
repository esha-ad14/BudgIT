import Navbar from "./Navbar/index";
import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import careers from './Pages/careers';
import ourservices from './Pages/ourservices';
import Login from './Pages/Login';
import InfoPrompt from './Pages/InfoPrompt';

class App extends Component {
    render() {
        return (
          <Router>
            <Navbar />
              <Switch>
                <Route path="/Home" exact component={Home} />
                <Route path="/About" component={About} />
                <Route path="/ourservices" component={ourservices} />
                <Route path="/careers" component={careers} />
                <Route path="/Contact" component={Contact} />
                <Route path="/Login" component={Login} />
                <Route path="/InfoPrompt" component={InfoPrompt} />
              </Switch>
            </Router>

        );
    }
}

export default App;
