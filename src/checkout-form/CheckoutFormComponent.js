import React from 'react';

export class CheckoutFormComponent extends React.Component {

    state = {
        "firstname": {"value" : ''},
        "lastname": {"value" : ''},
        "street": {"value" : ''},
        "city": {"value" : ''},
        "zip": {"value" : '', "valid" : false},
        "state": {"value" : ''},
        "cc": {"value" : ''},
        "states": []
    };

    componentDidMount() {
        fetch("http://localhost:8000/states")
            .then(resp => resp.json())
            .then(states => this.setState({states}))
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: {value} });
    };

    checkZipCodeValidity = (event) => {
        this.handleChange(event);
        if (event.target.validationMessage != "") {
            this.setState({zip: {valid: false} });
        } else {
            this.setState({zip: {valid: true} });
        }
    }

    render() {
		return (
            <form id="checkoutForm">
              <div className="row">
                <div className="col-lg-6">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="First name" name="firstname"
                             required value={this.state.firstname.value} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Last name" name="lastname"
                           required value={this.state.lastname.value} onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Street" name="street"
                           value={this.state.street.value} onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="City" name="city"
                           value={this.state.city.value} onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-lg-6">
                    { !this.state.zip.valid && <div className="alert alert-danger ">Please enter a 5-digit zipcode</div>}
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Zip" name="zip"
                           value={this.state.zip.value} onChange={this.checkZipCodeValidity} required pattern="[0-9]{5}"/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group">
                    <select className="form-control" placeholder="State" name="state"
                           value={this.state.state.value} onChange={this.handleChange}>
                        { this.state.states.map(st => <option value={st.abbreviation}>{st.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-group">
                    <input type="password" className="form-control" placeholder="Credit card number" name="cc" required
                           value={this.state.cc.value} onChange={this.handleChange}/>
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
