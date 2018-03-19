import React from 'react';
import styles from './style.module.css';

import {Link} from "react-router-dom";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";

export class Events extends DataComponent {
    static reg = /\{@link event:([\w]+)\}/;
    static isMatch(haystack) {
        return haystack.kind === 'event';
    }
    render() {
        let links = 'Loading...';

        if (Data.xData) {
            let options = [];
            Data.findInfo('', Data.xData, (needle, haystack) => {
                if (Events.isMatch(haystack)) {
                    let eventname = (haystack.memberof ? haystack.memberof + '.' : '') + haystack.name;
                    if (options.indexOf(eventname) === -1) {
                        options.push(eventname);
                    }
                }
            });

            links = [];
            const columnCount = 4,
                part = Math.ceil(options.length / columnCount);

            options = options.sort();

            for (let i = 1; i <= columnCount; i += 1) {
                links[i - 1] = <div key={i}>{options.slice((i - 1) * part, i * part).map((option, index) => (
                    <div key={option}>
                        <Link to={"/events/" + option.replace(/[^\w]/g, '-') + "/"}>{option}</Link>
                    </div>
                ))}</div>;
            }
        }

        return (
            <div className={styles.options}>
                {links}
            </div>
        )
    }
}