import React from 'react';

export class CheckoutForm extends React.Component {

    state = {
        "firstname": '',
        "lastname": '',
        "street": '',
        "city": '',
        "zip": '',
        "zipValid": false,
        "state": '',
        "cc": ''
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value });
    };

    render() {
		return (
            <form id="checkoutForm">
              <div className="row">
                <div className="col-lg-6">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="First name" name="firstname"
                             required value={this.state.firstname} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Last name" name="lastname"
                           required value={this.state.lastname} onChange={this.handleChange}/>
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
}
