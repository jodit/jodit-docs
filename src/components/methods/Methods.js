import React from 'react';
import styles from '../options/style.module.css';
import {Link} from "react-router-dom";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import {Options} from "../options/Options";
import Title from "../Title";
import Search from "../Search";
import {BASE_URL} from "../../consts";

export class Methods extends DataComponent {
    static isMethod(haystack) {
        return haystack.kindString === 'Method' && (!haystack.flags || !haystack.flags.isPrivate)
    }
    render() {
        let links = 'Loading...';

        if (Data.data) {
            let options = [];
            Data.findInfo('', Data.data, (needle, haystack) => {
                if (Methods.isMethod(haystack)) {
                    options.push(haystack.parent.name  + '.' + haystack.name);
                }
            });

            links = [];
            const part = Math.ceil(options.length / Options.columnCount);

            options = options.filter((method) => {
                return method.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
            }).sort();

            for (let i = 1; i <= Options.columnCount; i += 1) {
                links[i - 1] = <div key={i}>{options.slice((i - 1) * part, i * part).map((option, index) => (
                    <div key={option}>
                        <Link to={BASE_URL + "methods/" + option.replace(/\./, '-') + "/"}>{option}</Link>
                    </div>
                ))}</div>;
            }
        }

        return (
            <div className={styles.root}>
                <Title>Methods</Title>
                <Search onSearch={this.onSearch}/>
                <div className={styles.options}>
                    {links}
                </div>
            </div>
        )
    }
}