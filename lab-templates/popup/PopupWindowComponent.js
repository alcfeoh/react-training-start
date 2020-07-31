import React from 'react';
import './PopupWindowComponent.css';

class PopupWindowComponent extends React.Component {

	render() {
		if (!this.props.show) {
			return null;
		}
		return (
			<div className="overlay">
				<div className="overlay-head">
				<table width="100%">
					<tbody>
						<tr>
							<td className="alignLeft" width="98%">Item added to cart</td>
							<td className="alignRight" onClick={() => { this.props.close(); } }><sup>&#10005;</sup></td>
						</tr>
					</tbody>
				</table>
				</div>
				<div className="overlay-content alignLeft">Thanks for shopping with us!</div>
			</div>
		);
	}
}

export default PopupWindowComponent;