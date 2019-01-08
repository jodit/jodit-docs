import React from 'react';
import styles from './style.module.css';
import {Data} from "../data/Data";
import Jodit from "jodit";
import {Link} from "react-router-dom";
import {DataComponent} from "../data/DataComponent";
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import css from 'react-syntax-highlighter/languages/hljs/css';
import { agate as codeStyle} from 'react-syntax-highlighter/styles/hljs';
import NotFound from "../NotFound";
import Title from "../Title";
import Back from "../Back";
import {BASE_URL} from "../../consts";


registerLanguage('javascript', js);
registerLanguage('css', css);


export const stringify = (obj, replacer, space) => {
    return JSON.stringify(obj, (key, value) => {
        let fnBody;
        if (value instanceof Function || typeof value === 'function') {
            fnBody = value.toString();

            if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
                return '_NuFrRa_' + fnBody;
            }

            return fnBody;
        }

        if (value instanceof RegExp) {
            return '_PxEgEr_' + value;
        }

        return value;
    }, space);
};


const DefaultValue = (info) => {
    if (info.defaultValue) {
        return (<div className={styles.defaultValue}>
            {info.defaultValue}
        </div>)
    }

    return Jodit.defaultOptions[info.name] !== undefined ?  stringify(Jodit.defaultOptions[info.name], null, 2) : '';
};

export const Source = (info) => {
    return (<a target="_blank" href={`https://github.com/xdan/jodit/blob/master/src/${info.sources[0].fileName}#L${info.sources[0].line}`}>
        {info.sources[0].fileName}
    </a>);
};

export const Tag = (tag, index) => {
    switch (tag.tag) {
        case 'fires':
            return (<table key={index} className={styles.meta}>
                <tbody>
                    <tr>
                        <th>Fires:</th>
                        <td><span><Link to={BASE_URL + 'events/' + Jodit.modules.Helpers.trim(tag.text).replace(/[^\w]/, '.') + '/'}>{tag.text}</Link></span></td>
                    </tr>
                </tbody>
            </table>);
        case 'example': {
            const code = tag.text.replace(/```([\w]+)?/g, '').replace(/^[\s]+/g, '').replace(/[\s;]+$/g, '');

            return (<div key={index} className={styles.code}>
                <label>EXAMPLE</label>
                <SyntaxHighlighter showLineNumbers={false} language='javascript' style={codeStyle}>{code}</SyntaxHighlighter>
            </div>)
        }
        default: return (<div key={index} >
            <label>{tag.tag}</label>
            <div>{tag.text}</div>
        </div>);
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

export const PrintType = ({info, plain}) => {
    const pnt = (arrayOrScalar) => {
        return Array.isArray(arrayOrScalar) ? arrayOrScalar.map(pnt)
            : arrayOrScalar;
    };

    if (info.type) {
        const type = info.type.toString(plain);
        return pnt(type);
    }

    const result = [info.kindString + ' ' + info.name + ' {\n'];

    info.children.forEach((elm) => {
       result.push('  ' + elm.name  + ': ');
       result.push(PrintType({info: elm, plain}));
       result.push(',\n');
    });

    result.push('}');

    return result;
};

const PrintOption = (props) => {
    const {info} = props;

    return <div>
        <table className={styles.meta}>
            <tbody>
                <tr>
                    <td>Type:</td>
                    <td><span><PrintType info = {info} name={info.name}/></span></td>
                </tr>
                <tr>
                    <td>Default:</td>
                    <td><pre><DefaultValue {...info} name={info.name}/></pre></td>
                </tr>
                <tr>
                    <td>Source:</td>
                    <td><span><Source {...info}/></span></td>
                </tr>
            </tbody>
        </table>

        <ShortText {...info} name={info.name}/>

        <Tags {...info} name={info.name}/>
    </div>;
};

export class Option extends DataComponent {
    render() {
        let {match} = this.props, info = null;

        info || Data.findInfo('', Data.data, (needle, haystack) => {
            if (haystack.name === 'Config' && Array.isArray(haystack.children)) {
                Data.findInfo('', haystack, (needle, haystack) => {
                    if (haystack.kindString === 'Property' && haystack.name === match.params.optionName) {
                        info = haystack;
                        return true;
                    }
                });
            }
        });

        if (Data.data && !info) {
            return <NotFound/>;
        }

        return (
            <div className={styles.root}>
                <Back to={BASE_URL + 'options/'}>Back to Options</Back>
                {!Data.data ? 'Loading...' : (
                <div className={styles.info}>
                    <Title>{match.params.optionName}</Title>
                    <PrintOption info={info}/>
                </div>
                )}
            </div>
        )
    }
}