import React from 'react';
const img = require("../assets/card-types/mastercard.png");
class CheckoutFormComponent extends React.Component {
	render() {
		return (
<form id="checkoutForm">
  <div className="row">
    <div className="col-lg-6">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Firstname" name="firstname" required/>
        </div>
    </div>
    <div className="col-lg-6">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Lastname" name="lastname" required/>
      </div>
    </div>
  </div>
  <br/>
  <div className="row">
    <div className="col-lg-6">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Street" name="street"/>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="City" name="city"/>
      </div>
    </div>
  </div>
  <br/>
  <div className="row">
    <div className="col-lg-6">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Zip" name="zip"/>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="State" name="state"/>
      </div>
    </div>
  </div>
  <br/>
  <div className="row">
    <div className="col-lg-6">
      <div className="input-group">
        <input type="password" className="form-control" placeholder="Credit card number" name="cc" required/>
        <span className="input-group-addon" ><img src={img}/></span>
      </div>
    </div>
    <div className="col-lg-6">
    </div>
  </div>
  <br/>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

		);
	}
};

export default CheckoutFormComponent;
