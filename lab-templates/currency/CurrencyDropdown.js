import React from 'react';
import './CurrencyDropdown.css';

class CurrencyDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			showItems: false,
			currency: 'USD'
		};
    }
	render() {
		return (
			<div class="btn-group margin10">
				<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown"
					onClick={() => {
						this.setState({showItems : !this.state.showItems})
					}}>{this.state.currency}</button>
				<div class={this.state.showItems? "dropdown-menu show" : "dropdown-menu"}>
				<a class="dropdown-item" onClick={()=>this.setState({currency: 'USD', showItems : false})}>USD ($)</a>
				<a class="dropdown-item" onClick={()=>this.setState({currency: 'EUR', showItems : false})}>EUR (€)</a>
				<a class="dropdown-item" onClick={()=>this.setState({currency: 'GBP', showItems : false})}>GBP (£)</a>
				</div>
			</div>
		);
	}
};
	
export default CurrencyDropdown;