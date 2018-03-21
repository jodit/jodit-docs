import React from 'react';
import styles from '../options/style.module.css';

import {Link} from "react-router-dom";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import {Options} from "../options/Options";
import Title from "../Title";
import Search from "../Search";

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
            const part = Math.ceil(options.length / Options.columnCount);

            options = options.filter((eventname) => {
                return eventname.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
            }).sort();


            for (let i = 1; i <= Options.columnCount; i += 1) {
                links[i - 1] = <div key={i}>{options.slice((i - 1) * part, i * part).map((option, index) => (
                     <div key={option}>
                        <Link to={"/types/" + option + "/"}>{option}</Link>
                    </div>
                ))}</div>;
            }
        }

        return (
            <div className={styles.root}>
                <Title>Types</Title>
                <Search onSearch={this.onSearch}/>
                <div className={styles.options}>
                    {links}
                </div>
            </div>
        )
    }
}