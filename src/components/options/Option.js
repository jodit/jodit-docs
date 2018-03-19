import React from 'react';
import styles from './style.module.css';
import {Data} from "../data/Data";
import Jodit from "jodit";
import {DataComponent} from "../data/DataComponent";
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import css from 'react-syntax-highlighter/languages/hljs/css';
import { agate as codeStyle} from 'react-syntax-highlighter/styles/hljs';
registerLanguage('javascript', js);
registerLanguage('css', css);

const DefaultValue = (info) => {
    if (info.defaultValue) {
        return (<div className={styles.defaultValue}>
            {info.defaultValue}
        </div>)
    }

    return Jodit.defaultOptions[info.name] !== undefined ?  JSON.stringify(Jodit.defaultOptions[info.name], null, 2) : '';
};

export const Source = (info) => {
    return (<a target="_blank" href={`https://github.com/xdan/jodit/blob/master/src/${info.sources[0].fileName}#L${info.sources[0].line}`}>
        {info.sources[0].fileName}
    </a>);
};

export const Tag = (tag) => {
    switch (tag.tag) {
        case 'example': {
            const code = tag.text.replace(/```([\w]+)?/g, '').replace(/^[\s]+/g, '').replace(/[\s;]+$/g, '');

            return (<div className={styles.code}>
                <label>EXAMPLE</label>
                <SyntaxHighlighter showLineNumbers={false} language='javascript' style={codeStyle}>{code}</SyntaxHighlighter>
            </div>)
        }
        default: return '';
    }
};

export const Tags = (info) => {
    if (info.comment && info.comment.tags) {
        return info.comment.tags.map(Tag)
    }

    return '';
};

export const ShortText = (info) => {
    if (info.comment && info.comment.shortText) {
        return (<div className={styles.description}>
            {info.comment.shortText}
        </div>)
    }

    return '';
};

export const PrintType = (info) => {
    if (info.type) {
        return info.type.toString();
    }

    return '';
};

const PrintOption = (props) => {
    const {info} = props;

    return <div>
        <table className={styles.meta}>
            <tbody>
            <tr>
                <td>Type:</td>
                <td><span><PrintType {...info}/></span></td>
            </tr>
            <tr>
                <td>Default:</td>
                <td><pre><DefaultValue {...info}/></pre></td>
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

export class Option extends DataComponent {
    render() {
        const {match} = this.props;
        let info = null;

        Data.findInfo('', Data.data, (needle, haystack) => {
            if (haystack.name === 'Config' && Array.isArray(haystack.children)) {
                Data.findInfo('', haystack, (needle, haystack) => {
                    if (haystack.kindString === 'Property' && haystack.name === match.params.optionName) {
                        info = haystack;
                        return true;
                    }
                });
            }
        });

        return (
            <div className={styles.info}>
                <h1>{match.params.optionName}</h1>
                {!Data.data ? 'Loading...' : <PrintOption info={info}/>}
            </div>
        )
    }
}