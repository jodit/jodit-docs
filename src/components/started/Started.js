import React from "react";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import styles from "./style.module.css";
import {Markdown} from "../Markdown";


export class Started extends DataComponent {
    render() {
        document.title = 'Jodit v.3.0 - Get Started'
        return (<div className={styles.root}>
            {!Data.data ? 'Loading...' : (<div>
                <Markdown source={Data.started} />
            </div>)}
        </div>);
    }
}
