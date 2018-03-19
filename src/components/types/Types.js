import React from 'react';
import styles from './style.module.css';

import {Link} from "react-router-dom";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";

export class Types extends DataComponent {
    static types = [
        'Type alias', 'Interface'
    ];
    render() {
        let links = 'Loading...';

        if (Data.data) {
            let options = [];
            Data.findInfo('', Data.data, (needle, haystack) => {
                if (Types.types.indexOf(haystack.kindString) !== -1 && options.indexOf(haystack.name) === -1) {
                    options.push(haystack.name);
                }
            });

            links = [];
            const columnCount = 4,
                part = Math.ceil(options.length / columnCount);

            options = options.sort();

            for (let i = 1; i <= columnCount; i += 1) {
                links[i - 1] = <div key={i}>{options.slice((i - 1) * part, i * part).map((option, index) => (
                     <div key={option}>
                        <Link to={"/types/" + option + "/"}>{option}</Link>
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