import React, { Component } from 'react';
import styles from './style.module.css';
import Jodit from "jodit";
import {Link} from "react-router-dom";

export class Methods extends Component {
    render() {
        const list = Object.keys(Jodit).map(method => {
            return (<div key={method}>
                <Link to={"/methods/" + method}>{method}</Link>
            </div>);
        });

        return (
            <div className={styles.root}>
                {list}
            </div>
        )
    }
}