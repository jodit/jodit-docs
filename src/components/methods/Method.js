import React from 'react';
import styles from '../options/style.module.css';
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import {ShortText, Source, Tags} from "../options/Option";
import {Methods} from "./Methods";
import {agate as codeStyle} from "react-syntax-highlighter/styles/hljs/index";
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import ts from 'react-syntax-highlighter/languages/hljs/typescript';
import Title from "../Title";
import NotFound from "../NotFound";
import Back from "../Back";
import {BASE_URL} from "../../consts";

registerLanguage('typescript', ts);

export const TypeScript = (props) => {
    return <SyntaxHighlighter showLineNumbers={false} language='typescript' style={codeStyle}>{props.children}</SyntaxHighlighter>;
};
const PrintOption = (props) => {
    /**
     * @type Node
     */
    const info = props.info;

    let code = info.signatures[0].toCode();

    return <div>
        <TypeScript>{code}</TypeScript>
        <table className={styles.meta}>
            <tbody>
            <tr>
                <td>Source:</td>
                <td><span><Source {...info} name={info.name}/></span></td>
            </tr>
            </tbody>
        </table>

        <ShortText {...info.signatures[0]} name={info.name}/>

        <Tags {...info.signatures[0]} name={info.signatures[0].name}/>
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

        if (Data.data && !info) {
            return <NotFound/>;
        }

        return (
            <div className={styles.root}>
                <Back to={BASE_URL + 'methods/'}>Back to Methods</Back>
                {!Data.data ? 'Loading...' : <div className={styles.info}>
                    <Title>{match.params.name.replace('-', '.')}</Title>
                    <PrintOption info={info}/>
                </div>}
            </div>
        )
    }
}