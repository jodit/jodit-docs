import React from 'react';
import styles from '../options/style.module.css';
import {Data} from "../data/Data";
import {DataComponent} from "../data/DataComponent";
import {ShortText, Source, Tags} from "../options/Option";
import {Methods} from "./Methods";
import Title from "../Title";
import NotFound from "../NotFound";
import Back from "../Back";
import {BASE_URL} from "../../consts";
import {Syntax} from "../Markdown";


export const TypeScript = (props) => {
    return <Syntax language='typescript'>{props.children}</Syntax>;
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
                let
                  name = haystack.parent.name;
                const
                  index = haystack.parent.name.indexOf(haystack.name);

                if (index === -1 || index !== haystack.parent.name.length - haystack.name.length) {
                    name = haystack.parent.name  + '.' + haystack.name;
                }

                if (Methods.normalizeMethodNameToURL(name) === match.params.name) {
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
