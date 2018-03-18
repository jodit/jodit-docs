import React, { Component } from 'react';
import styles from './app.module.css';
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import {Options} from "./components/options/Options";
import {Events} from "./components/events/Events";
import {Methods} from "./components/methods/Methods";
import {Option} from "./components/options/Option";



class App extends Component {
  render() {
    return (
        <Router>
            <Root>
                <SideBar>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected} to={"/options/"}>Options</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={"/methods/"}>Methods</NavLink>
                    </SideBarItem>
                    <SideBarItem>
                        <NavLink activeClassName={styles.selected}  to={"/events/"}>Events</NavLink>
                    </SideBarItem>
                </SideBar>
                <Main>
                    <Route exact={true} path={"/"} render={() => (
                        <h1>Welcome to jodit documentation</h1>
                    )}/>
                    <Route exact={true} path={"/options/"} component={Options}/>
                    <Route path={"/options/:optionName/"} component={Option}/>

                    <Route path={"/methods/"} component={Methods}/>
                    <Route path={"/events/"} component={Events}/>
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
