import React from 'react';
import './PopupWindow.css';

export function PopupWindow(props) {

		if (!props.show) {
			return null;
		}
		return (
			<div className="overlay">
				<div className="overlay-head">
				<table width="100%">
					<tbody>
						<tr>
							<td className="alignLeft" width="98%">{props.title}</td>
							<td className="alignRight" onClick={() => { props.onClose(); } }><sup>&#10005;</sup></td>
						</tr>
					</tbody>
				</table>
				</div>
				<div className="overlay-content alignLeft">
					{props.children}
				</div>
			</div>
		);
}
