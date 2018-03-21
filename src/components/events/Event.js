import React from 'react';
import styles from '../options/style.module.css';
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import {Events} from "./Events";
import {Source, Tags} from "../options/Option";
import Title from "../Title";
import NotFound from "../NotFound";
import Back from "../Back";
import {BASE_URL} from "../../consts";

const ShortText = (info) => {
    if (info.description) {
        return (<div className={styles.description}>
            {info.description}
        </div>)
    }

    return '';
};

const Fires = (props) => {
    const fires = props.info;

    return (<table className={styles.meta}>
        <thead>
            <tr>
                <th>Expression:</th>
                <th>Source:</th>
            </tr>
        </thead>
        <tbody>
            {fires.fires.map((data) => {
                return  (<tr key={data}>
                    <td><pre>{data.expr}</pre></td>
                    <td><span><Source sources={[{fileName: data.file, line: data.line}]}/></span></td>
                </tr>);
            })}
        </tbody>
    </table>);
};

export class Event extends DataComponent {
    render() {
        const {match} = this.props;
        let info = {
            jsdoc: null,
            fires: null,
        }, eventName = match.params.name.replace('-', '.');

        Data.findInfo('', Data.xData, (needle, haystack) => {
            if (Events.isMatch(haystack)) {
                let eventname = haystack.name;
                if (eventname === match.params.name) {
                    info.jsdoc = haystack;
                    return true;
                }
            }
        });

        if (Data.firesData) {
            if (Data.firesData[eventName]) {
                info.fires = Data.firesData[eventName];
            }
        }

        if (Data.xData && !info.jsdoc && !info.fires) {
            return <NotFound/>;
        }

        return (
            <div className={styles.root}>
                <Back to={BASE_URL + 'events/'}>Back to Events</Back>
                {!Data.data ? 'Loading...' :  <div className={styles.info}>
                    <Title>{eventName}</Title>
                    <ShortText {...info.jsdoc}/>
                    {info.jsdoc && info.jsdoc.examples && <Tags comment={{tags: info.jsdoc.examples.map((text) => ({tag: 'example', text: text.replace(/\r/g, '\n')}))}}/>}
                    {info.fires && <Fires info={info.fires}/>}
                </div>}
            </div>
        )
    }
}