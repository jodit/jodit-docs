import React from 'react';
import styles from '../options/style.module.css';

import {Link} from "react-router-dom";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import {Options} from "../options/Options";
import Title from "../Title";
import Search from "../Search";
import {BASE_URL} from "../../consts";

export class Events extends DataComponent {
    static reg = /\{@link[\s]+event:[\s]*([\w]+)\}/;
    static isMatch(haystack) {
        return haystack.kind === 'event';
    }
    render() {
        let links = 'Loading...';

        if (Data.firesData) {
            let options = Object.keys(Data.firesData);

            Data.findInfo('', Data.xData, (needle, haystack) => {
                if (Events.isMatch(haystack)) {
                    let eventname = haystack.name;
                    if (options.indexOf(eventname) === -1) {
                        options.push(eventname);
                    }
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
                        <Link to={BASE_URL + "events/" + option.replace(/[^\w]/g, '-') + "/"}>{option}</Link>
                    </div>
                ))}</div>;
            }
        }

        return (
            <div className={styles.root}>
                <Title>Events</Title>
                <Search onSearch={this.onSearch}/>
                <div className={styles.options}>
                    {links}
                </div>
            </div>
        )
    }
}