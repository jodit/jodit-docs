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




class App extends Component {
  render() {
    Data.load();
    return (
        <Router>
            <Root>
                <SideBar>
                    <SideBarItem>
                        <NavLink exact={true} activeClassName={styles.selected} to={"/"}>Get started</NavLink>
                    </SideBarItem>
                    <h4>API</h4>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected} to={"/options/"}>Options</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={"/methods/"}>Methods</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={"/events/"}>Events</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={"/types/"}>Types</NavLink>
                    </SideBarItem>
                </SideBar>
                <Main>
                    <Switch>
                        <Route exact={true} path={"/"} component={Started}/>

                        <Route exact={true} path={"/options/"} component={Options}/>
                        <Route path={"/options/:optionName/"} component={Option}/>

                        <Route exact={true} path={"/types/"} component={Types}/>
                        <Route path={"/types/:typeName/"} component={Type}/>


                        <Route exact={true} path={"/methods/"} component={Methods}/>
                        <Route path={"/methods/:name/"} component={Method}/>

                        <Route exact={true} path={"/events/"} component={Events}/>
                        <Route  path={"/events/:name/"} component={Event}/>

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
