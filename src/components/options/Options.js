import React from 'react';
import styles from './style.module.css';

import {Link} from "react-router-dom";
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import Title from "../Title";
import Search from "../Search";
import {BASE_URL} from "../../consts";

export class Options extends DataComponent {
    static columnCount = 3;
    render() {
        let links = 'Loading...';
        let options = [];

        if (Data.data) {
            Data.findInfo('', Data.data, (needle, haystack) => {
                if (haystack.name === 'Config' && Array.isArray(haystack.children)) {
                    haystack.children
                        .forEach((child) => {
                            if (child.kindString === 'Property' && !options.includes(child)) {
                                options.push(child);
                            }
                        });
                }
            });

            links = [];
            const memory = {};

            options = options.filter((child) => {
                if (memory[child.name]) {
                    return false;
                }
                memory[child.name] = true;
                return child.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
            }).sort((a, b) => a.name > b.name ? 1: -1);

            const part = Math.ceil(options.length / Options.columnCount);

            for (let i = 1; i <= Options.columnCount; i += 1) {
                links[i - 1] = <div key={i}>{options.slice((i - 1) * part, i * part).map((option, index) => (
                     <div key={option.name}>
                        <Link to={BASE_URL + "options/" + option.name + "/"}>{option.name}</Link>
                    </div>
                ))}</div>;
            }

            if (!options.length) {
                links = 'No match found';
            }
        }

        return (
            <div className={styles.root}>
                <Title>Options</Title>

                <Search onSearch={this.onSearch}/>

                <div className={styles.options}>
                    {links}
                </div>
            </div>
        )
    }
}
