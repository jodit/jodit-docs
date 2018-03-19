import React from 'react';
import styles from './style.module.css';
import {Data} from "../data/Data";
import Jodit from "jodit";
import {DataComponent} from "../data/DataComponent";
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import css from 'react-syntax-highlighter/languages/hljs/css';
import { agate as codeStyle} from 'react-syntax-highlighter/styles/hljs';
import {Types} from "./Types";
import {PrintType, ShortText, Source, Tags} from "../options/Option";
registerLanguage('javascript', js);
registerLanguage('css', css);



const PrintOption = (props) => {
    const {info} = props;

    return <div>
        <table className={styles.meta}>
            <tbody>
            <tr>
                <td>Type:</td>
                <td><pre><PrintType {...info}/></pre></td>
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

        return (
            <div className={styles.info}>
                <h1>{match.params.typeName}</h1>
                {!Data.data ? 'Loading...' : <PrintOption info={info}/>}
            </div>
        )
    }
}