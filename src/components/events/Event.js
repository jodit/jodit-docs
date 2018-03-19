import React from 'react';
import styles from '../options/style.module.css';
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import {Events} from "./Events";

const ShortText = (info) => {
    if (info.description) {
        return (<div className={styles.description}>
            {info.description}
        </div>)
    }

    return '';
};

const PrintOption = (props) => {
    /**
     * @type Node
     */
    const info = props.info;


    return <div>
        <ShortText {...info}/>
    </div>;
};

export class Event extends DataComponent {
    render() {
        const {match} = this.props;
        let info = null;

        Data.findInfo('', Data.xData, (needle, haystack) => {
            if (Events.isMatch(haystack)) {
                let eventname = (haystack.memberof ? haystack.memberof + '.' : '') + haystack.name;
                if (eventname === match.params.name) {
                    info = haystack;
                    return true;
                }
            }
        });

        return (
            <div className={styles.info}>
                <h1>{match.params.name.replace('-', '.')}</h1>
                {!Data.data ? 'Loading...' : <PrintOption info={info}/>}
            </div>
        )
    }
}