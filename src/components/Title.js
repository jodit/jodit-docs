import React from "react";

const Title = (props) => {
    document.title = props.children;
    return <h1>{props.children}</h1>
};

export default Title;