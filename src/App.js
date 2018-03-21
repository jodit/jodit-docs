import React, { Component } from 'react';
import styles from './app.module.css';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import {Options} from "./components/options/Options";
import {Events} from "./components/events/Events";
import {Event} from "./components/events/Event";
import {Methods} from "./components/methods/Methods";
import {Option} from "./components/options/Option";
import {Type} from "./components/types/Type";
import {Types} from "./components/types/Types";
import {Method} from "./components/methods/Method";
import {Data} from "./components/data/Data";
import NotFound from "./components/NotFound";
import {Started} from "./components/started/Started";
import {BASE_URL} from "./consts";


class App extends Component {
  render() {
    Data.load();
    return (
        <Router>
            <Root>
                <SideBar>
                    <SideBarItem>
                        <NavLink exact={true} activeClassName={styles.selected} to={BASE_URL}>Get started</NavLink>
                    </SideBarItem>
                    <h4>API</h4>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected} to={BASE_URL + "options/"}>Options</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={BASE_URL + "methods/"}>Methods</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={BASE_URL + "events/"}>Events</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={BASE_URL + "types/"}>Types</NavLink>
                    </SideBarItem>
                </SideBar>
                <Main>
                    <Switch>
                        <Route exact={true} path={BASE_URL} component={Started}/>

                        <Route exact={true} path={BASE_URL + "options/"} component={Options}/>
                        <Route path={BASE_URL + "options/:optionName/"} component={Option}/>

                        <Route exact={true} path={BASE_URL + "types/"} component={Types}/>
                        <Route path={BASE_URL + "types/:typeName/"} component={Type}/>


                        <Route exact={true} path={BASE_URL + "methods/"} component={Methods}/>
                        <Route path={BASE_URL + "methods/:name/"} component={Method}/>

                        <Route exact={true} path={BASE_URL + "events/"} component={Events}/>
                        <Route  path={BASE_URL + "events/:name/"} component={Event}/>

                        <Route component={NotFound} />
                    </Switch>
                </Main>
            </Root>
        </Router>
    );
  }
}

const Root = (props) => (
    <div className={styles.root} {...props}/>
);

const SideBar = (props) => (
    <div className={styles.sidebar} {...props}/>
);

const SideBarItem = (props) => (
    <div className={styles.sidebar_item} {...props}/>
);

const Main = (props) => (
    <div className={styles.main} {...props}/>
);

export default App;
