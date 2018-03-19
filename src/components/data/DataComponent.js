import React, { Component } from 'react';
import {Data} from "./Data";

export class DataComponent extends Component {
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