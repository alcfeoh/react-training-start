import React, { Component } from 'react';
import LicensePlateComponent from './LicensePlateComponent';
import {LICENSE_PLATES} from "./mock-data";
class LicensePlateService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
		this.setState({ data : LICENSE_PLATES })
    }    
    render() {
        if (!this.state.data) {
            return null;
        }
        return this.state.data.map((licensePlate, index) => {
            return <div key={licensePlate._id} className="col-md-4" style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}>
            <LicensePlateComponent plate={licensePlate} buttonText="Add to cart"/>
            </div>
        });

    }
}
export default LicensePlateService;