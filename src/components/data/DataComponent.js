import React, { Component } from 'react';
import {Data} from "./Data";

export class DataComponent extends Component {
    state = {
        query: ''
    };
    onSearch = (query) => {
        this.setState({
            query
        });
    };
    componentDidMount() {
        Data.load(() => {
            this.forceUpdate();
        });
    }
    render() {
        return (
            <div>
                Loading...
            </div>
        )
    }
}