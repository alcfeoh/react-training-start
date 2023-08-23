import React, {useState} from 'react';

export function CheckoutForm() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zio, setZip] = useState('');
    const [zipValid, setZipValid] = useState(false);
    const [state, setState] = useState('');
    const [cc, setCc] = useState('');

    const handleChange = (event, setter) => {
        const {value} = event.target;
        setter(value);
    };

    return (
        <form id="checkoutForm">
          <div className="row">
            <div className="col-lg-6">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="First name" name="firstname"
                         required value={firstname} onChange={e => handleChange(e, setFirstname)}/>
                </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Last name" name="lastname"
                       required value={lastname} onChange={e => handleChange(e, setLastname)}/>
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
