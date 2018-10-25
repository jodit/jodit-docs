import React from 'react';
import styles from '../options/style.module.css';
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import { renderToStaticMarkup } from 'react-dom/server'
import {Types} from "./Types";
import {PrintType, ShortText, Source, Tags} from "../options/Option";
import Title from "../Title";
import NotFound from "../NotFound";
import {TypeScript} from "../methods/Method";
import Back from "../Back";
import {BASE_URL} from "../../consts";

const PrintOption = (props) => {
    const {info} = props;

    return <div>
        <table className={styles.meta}>
            <tbody>
            <tr>
                <td>Type:</td>
                <td><TypeScript>{renderToStaticMarkup(<PrintType plain={true} {...info}/>)}</TypeScript></td>
            </tr>
            <tr>
                <td>Source:</td>
                <td><span><Source {...info}/></span></td>
            </tr>
            </tbody>
        </table>

        <ShortText {...info}/>

        <Tags {...info}/>
    </div>;
};

export class Type extends DataComponent {
    render() {
        const {match} = this.props;
        let info = null;

        Data.findInfo('', Data.data, (needle, haystack) => {
            if (Types.types.indexOf(haystack.kindString) !== -1 && haystack.name === match.params.typeName) {
                info = haystack;
                return true;
            }
        });

        if (Data.data && !info) {
            return <NotFound/>;
        }

        return (
            <div className={styles.root}>
                <Back to={BASE_URL + 'types/'}>Back to Types</Back>
                {!Data.data ? 'Loading...' : <div className={styles.info}>
                    <Title>{match.params.typeName}</Title>
                    <PrintOption info={info}/>
                </div>}
            </div>
        )
    }
}