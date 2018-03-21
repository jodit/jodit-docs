import React from 'react';
import Title from "./Title";
import styles from "./options/style.module.css";

const NotFound = () => (
    <div className={styles.root}>
        <Title>404 page not found</Title>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
);

export default NotFound;