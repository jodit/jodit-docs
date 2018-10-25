import React from "react";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import ReactMarkdown from 'react-markdown'
import styles from "./style.module.css";

export class Started extends DataComponent {
    render() {
        document.title = 'Jodit v.3.0 - Get Started'
        return (<div className={styles.root}>
            {!Data.data ? 'Loading...' : (<div>
                <ReactMarkdown source={Data.started} />
            </div>)}
        </div>);
    }
}