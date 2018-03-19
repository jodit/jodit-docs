import React from 'react';
import styles from '../options/style.module.css';
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";

import {ShortText, Source, Tags} from "../options/Option";
import {Methods} from "./Methods";
import {agate as codeStyle} from "react-syntax-highlighter/styles/hljs/index";
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import ts from 'react-syntax-highlighter/languages/hljs/typescript';

registerLanguage('typescript', ts);

const PrintOption = (props) => {
    /**
     * @type Node
     */
    const info = props.info;

    let code = info.signatures[0].toCode();

    return <div>
        <SyntaxHighlighter showLineNumbers={false} language='typescript' style={codeStyle}>{code}</SyntaxHighlighter>
        <table className={styles.meta}>
            <tbody>
            <tr>
                <td>Source:</td>
                <td><span><Source {...info}/></span></td>
            </tr>
            </tbody>
        </table>

        <ShortText {...info.signatures[0]}/>

        <Tags {...info.signatures[0]}/>
    </div>;
};

export class Method extends DataComponent {
    render() {
        const {match} = this.props;
        let info = null;

        Data.findInfo('', Data.data, (needle, haystack) => {
            if (Methods.isMethod(haystack)) {
                if (haystack.parent.name + '-' + haystack.name === match.params.name) {
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