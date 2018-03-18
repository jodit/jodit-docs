import React, { Component } from 'react';
import styles from './style.module.css';
import Jodit from 'jodit';
import {Link} from "react-router-dom";

export class Options extends Component {
    render() {
        const links = Object.keys(Jodit.defaultOptions).map((option) => {
            return (<div key={option}>
                <Link to={"/options/" + option + "/"}>{option}</Link>
            </div>);
        });

        return (
            <div className={styles.root}>
                {links}
            </div>
        )
    }
}