import React, {Component} from 'react';
import styles from './style.module.css';
import {Data} from "../data/Data";

;

export class Option extends Component {
    componentDidMount() {
        Data.load(() => {
            this.forceUpdate();
        });
    }
    render() {
        const {match} = this.props;


        return (
            <div className={styles.root}>
                <h1>{match.params.optionName}</h1>
                {!Data.data ? 'Loading...' : (
                    <div>
                        {Data.findInfo(match.params.optionName)}
                    </div>
                )}
            </div>
        )
    }
}