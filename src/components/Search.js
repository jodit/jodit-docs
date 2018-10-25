import React, {Component} from "react";
import styles from "./options/style.module.css";

export default class  Search extends Component {
    onChange = (event) => {
        this.props.onSearch(event.target.value);
    };
    render() {
        return  (<div  className={styles.search}>
            <input type="text" onChange={this.onChange} placeholder="Search"/>
        </div>);
    }
}