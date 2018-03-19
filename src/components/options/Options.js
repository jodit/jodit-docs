import React from 'react';
import styles from './style.module.css';

import {Link} from "react-router-dom";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";

export class Options extends DataComponent {
    render() {
        let links = 'Loading...';

        if (Data.data) {
            let options = [];
            Data.findInfo('', Data.data, (needle, haystack) => {
                if (haystack.name === 'Config' && Array.isArray(haystack.children)) {
                    haystack.children
                        .forEach((child) => {
                            if (child.kindString === 'Property') {
                                options.push(child.name);
                            }
                        });
                }
            });

            links = [];
            const columnCount = 4,
                part = Math.ceil(options.length / columnCount);

            options = options.sort();

            for (let i = 1; i <= columnCount; i += 1) {
                links[i - 1] = <div key={i}>{options.slice((i - 1) * part, i * part).map((option, index) => (
                     <div key={option}>
                        <Link to={"/options/" + option + "/"}>{option}</Link>
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