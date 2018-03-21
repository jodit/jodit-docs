import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./options/style.module.css";

const Back = (props) => ( <div  className={styles.backLink}>
    <NavLink to={props.to}>{props.children}</NavLink>
</div>);

export default Back;