import React, { Component } from 'react';
import styles from './app.module.css';
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import {Options} from "./components/options/Options";
import {Events} from "./components/events/Events";
import {Event} from "./components/events/Event";
import {Methods} from "./components/methods/Methods";
import {Option} from "./components/options/Option";
import {Type} from "./components/types/Type";
import {Types} from "./components/types/Types";
import {Method} from "./components/methods/Method";



class App extends Component {
  render() {
    return (
        <Router>
            <Root>
                <SideBar>
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
                    <Route exact={true} path={"/"} render={() => (
                        <h1>Welcome to jodit documentation</h1>
                    )}/>

                    <Route exact={true} path={"/options/"} component={Options}/>
                    <Route path={"/options/:optionName/"} component={Option}/>

                    <Route exact={true} path={"/types/"} component={Types}/>
                    <Route path={"/types/:typeName/"} component={Type}/>


                    <Route exact={true} path={"/methods/"} component={Methods}/>
                    <Route path={"/methods/:name/"} component={Method}/>

                    <Route exact={true} path={"/events/"} component={Events}/>
                    <Route  path={"/events/:name/"} component={Event}/>
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
