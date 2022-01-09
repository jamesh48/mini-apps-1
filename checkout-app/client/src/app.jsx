'use strict';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formOneSubmission = this.formOneSubmission.bind(this);
    this.formTwoSubmission = this.formTwoSubmission.bind(this);
    this.formThreeSubmission = this.formThreeSubmission.bind(this);
    this.formFourSubmission = this.formFourSubmission.bind(this);
    this.deleteDatabase = this.deleteDatabase.bind(this);

    this.state = {
      updatingId: 0,
      pageDisplayed: 0,
      // Login
      loginName: '',
      loginEmail: '',
      loginPassword: '',
      // Address
      addressOne: '',
      addressTwo: '',
      addressCity: '',
      addressState: '',
      addressZip: '',
      addressPhone: '',
      // Billing
      billingZip: '',
      billingCVV: '',
      billingCC: '',
      // Purchased
      purchased: false
    }
  }

  deleteDatabase() {
    const config = {
      method: 'POST',
      url: 'http://localhost:3000/delete'
    }

    return axios(config)
      .then((results) => {
        console.log(results.data);
      })
  }

  handleClick(incomingPage) {
    let status = true;
    if (incomingPage === 2) {
      status = this.formOneSubmission();
    } else if (incomingPage === 3) {
      status = this.formTwoSubmission();
    } else if (incomingPage === 4) {
      status = this.formThreeSubmission();
    } else if (incomingPage === 5) {
      status = this.formFourSubmission();
    }
    if (!status) {
      return;
    } else {
      this.setState({ pageDisplayed: incomingPage })
    }
  }

  handleChange(event) {
    // console.log(event.target.id, event.target.value)
    const incomingInputName = event.target.id;
    const incomingValue = event.target.value;
    console.log(incomingInputName, incomingValue)
    const update = new Object()
    update[incomingInputName] = incomingValue;
    this.setState(prevState => {
      return update
    }, () => {
      console.log(this.state)
    })
  }

  formOneSubmission() {
    const username = this.state.loginName;
    const password = this.state.loginPassword;
    const email = this.state.loginEmail;
    if (username === '') {
      alert('Missing Name');
      return false;
    }
    if (password === '') {
      alert('Missing Password');
      return false;
    }
    if (email === '') {
      alert('Missing Email');
      return false;
    }
    console.log(username);
    var config = {
      'url': `http://localhost:3000/new`,
      'method': 'POST',
      data: {
        username: username,
        password: password,
        email: email
      }
    }

    return axios(config)
      .then((results) => {
        // // Mongo/Mongoose
        // console.log(`here-> ` + results.data)
        // this.setState({updatingId: results.data});
        // mySql raw
        console.log(`here-> ` + results.data.insertId)
        this.setState({ updatingId: results.data.insertId })
        // Sequelize
        // console.log(`here-> ` + results.data.id);
        // this.setState({ updatingId: results.data.id });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  formTwoSubmission() {
    const { addressOne, addressTwo, addressCity, addressState, addressZip, addressPhone, updatingId } = this.state;

    if (addressOne === '' || addressCity === '' || addressState === '' || addressZip === ''
    || addressPhone === '') {
      alert('Missing Fields');
      return false;
    }

    var config = {
      'url': `http://localhost:3000/updateAddress`,
      'method': 'POST',
      data: {
        addressOne: addressOne,
        addressTwo: addressTwo,
        addressCity: addressCity,
        addressState: addressState,
        addressZip: addressZip,
        addressPhone: addressPhone,
        updatingId: updatingId
      }
    }
    return axios(config)
      .then((results) => {
        console.log(results.data)
      })
  }

  formThreeSubmission() {
    const { billingCC, billingCVV, billingZip, updatingId } = this.state;

    if (billingCC === '' || billingCVV === '' || billingZip === '') {
      alert('Missing Fields!');
      return false;
    }
    const config = {
      'url': `http://localhost:3000/updateBilling`,
      'method': 'POST',
      data: {
        billingCC: billingCC,
        billingCVV: billingCVV,
        billingZip: billingZip,
        updatingId: updatingId
      }
    }
    return axios(config)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  formFourSubmission() {
    const { purchased, updatingId } = this.state;
    const config = {
      'url': `http://localhost:3000/completePurchase`,
      'method': 'POST',
      data: {
        purchased: true,
        updatingId: updatingId
      }
    }
    return axios(config)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { pageDisplayed, name } = this.state;

    const { handleClick, handleChange, deleteDatabase } = this;
    return (
      <div>
        <Button pageDisplayed={pageDisplayed} handleClick={handleClick} />
        <FormOne handleChange={handleChange} pageDisplayed={pageDisplayed} handleClick={handleClick} />
        <FormTwo pageDisplayed={pageDisplayed} handleChange={handleChange} handleClick={handleClick} />
        <FormThree pageDisplayed={pageDisplayed} handleChange={handleChange} handleClick={handleClick} />
        <ConfirmationPage all={this.state} pageDisplayed={pageDisplayed} handleChange={handleChange} handleClick={handleClick} />
        <Delete delete={deleteDatabase} />
      </div>
    );
  }
}

const Delete = (props) => {
  return (
    <div>
      <input type='button' value='reset database' onClick={props.delete} />
    </div>
  )
}

const Button = (props) => {
  return props.pageDisplayed === 0 ?
    <div>
      <input onClick={() => { props.handleClick(1) }} type='button' id='0' value='Start Checkout'></input>
    </div>
    :
    null
}

const FormOne = (props) => {
  return props.pageDisplayed === 1 ?
    <div>
      <h4>Your Information:</h4>
      <form className='input-form'>
        <input autocomplete='off' className='form-input' type='text' placeholder='name' id='loginName' onChange={props.handleChange}></input>
        <input className='form-input' autocomplete='off' type='text' placeholder='e-mail' id='loginEmail' onChange={props.handleChange}></input>
        <input className='form-input' autocomplete='off' id='loginPassword' type='text' placeholder='password' onChange={props.handleChange}></input>
        <div className='form-buttons'>
          <input className='form-button' type='button' value='Back' onClick={() => { props.handleClick(0) }}></input>
          <input className='form-button' type='button' onClick={() => { props.handleClick(2) }} value='Next'></input>
        </div>
      </form>
    </div>
    :
    null
}

const FormTwo = (props) => {
  return props.pageDisplayed === 2 ?
    <div>
      <h4>Ship To...</h4>
      <form className='input-form'>

        <input className='form-input' autocomplete='off' type='text' placeholder='line one' id='addressOne' onChange={props.handleChange} />


        <input className='form-input' autocomplete='off' type='text' placeholder='line two' id='addressTwo' onChange={props.handleChange} />


        <input className='form-input' autocomplete='off' type='text' placeholder='City' id='addressCity' onChange={props.handleChange}></input>

        <input className='form-input' autocomplete='off' type='text' placeholder='State' id='addressState' onChange={props.handleChange}></input>
        <input className='form-input' autocomplete='off' type='text' placeholder='Zip Code' id='addressZip' onChange={props.handleChange}></input>
        <input className='form-input' autocomplete='off' type='text' placeholder='Phone Number' id='addressPhone' onChange={props.handleChange}></input>
        <div>
          <input className='form-button' type='button' value='Back' onClick={() => { props.handleClick(1) }}></input>
          <input className='form-button' type='button' value='Next' onClick={() => { props.handleClick(3) }} ></input>
        </div>
      </form>
    </div>

    : null
}

const FormThree = (props) => {
  return props.pageDisplayed === 3 ?
    <div>
      <h4>Your Payment Information</h4>
      <form className='input-form'>
        <input className='form-input' autocomplete='off' type='text' placeholder='CC#' id='billingCC' onChange={props.handleChange} />
        <input className='form-input' autocomplete='off' type='text' placeholder='CVV' id='billingCVV' onChange={props.handleChange} />
        <input className='form-input' autocomplete='off' type='text' placeholder='Billing Zip Code' id='billingZip' onChange={props.handleChange} />
        <div className='form-buttons'>
          <input className='form-button' type='button' value='Back' onClick={() => { props.handleClick(2) }}></input>
          <input className='form-button' type='button' value='Next' onClick={() => { props.handleClick(4) }}></input>
        </div>
      </form>
    </div>
    : null
}

const ConfirmationPage = (props) => {

  return props.pageDisplayed === 4 ?
    <div>
      <h3>Confirmation!</h3>
      <div>
        <h4>User</h4>
        <div className='confirmation-details'>
          <p>User: {props.all.loginName}</p>
          <p>Email: {props.all.loginEmail}</p>
          <p>Password: {props.all.loginPassword}</p>
        </div>
      </div>

      <div>
        <h4>Address</h4>
        <div className='confirmation-details'>
          <p>Line 1: {props.all.addressOne}</p>
          <p>{props.all.addressTwo}</p>
          <p>City: {props.all.addressCity}</p>
          <p>State: {props.all.addressState}</p>
          <p>Zip: {props.all.addressZip}</p>
          <p>Phone: {props.all.addressPhone}</p>
        </div>
      </div>

      <div>
        <h4>Payment Details</h4>
        <div className='confirmation-details cc-details'>
          <div className='inline-details'>
            <h5>CC Number: </h5>
            <p>{props.all.billingCC.replace(/[0-9]/g, (match, index, originalString) => {
              return index < 12 ? '*' : match
            })}</p>
          </div>
          <div className='inline-details'>
            <h5>CVV: </h5>
            <p>{props.all.billingCVV}</p>
            <h5>Billing Zip: </h5>
            <p>{props.all.billingZip}</p>
          </div>

        </div>
      </div>
      <div className='form-buttons'>
        <input className='form-button' type='button' value='Back' onClick={() => { props.handleClick(3) }}></input>
        <input className='form-button' type='button' value='Complete Purchase' onClick={() => { props.handleClick(5) }}></input>
      </div>
    </div>
    : null
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);