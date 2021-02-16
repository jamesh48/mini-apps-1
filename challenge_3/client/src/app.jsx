'use strict';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.formOneSubmission = this.formOneSubmission.bind(this);
    this.state = {
      pageDisplayed: 0
    }
  }

  handleClick(incomingPage) {
    this.setState({ pageDisplayed: incomingPage }, () => {
      this.formOneSubmission();
    })
  }

  formOneSubmission() {
    var config = {
      'url': `http://localhost:3000/form`,
      'method': 'POST'
    }
    return axios(config)
      .then((results) => {
        console.log(results.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { pageDisplayed } = this.state;
    const { handleClick } = this;
    return (
      <div>
        <Button pageDisplayed={pageDisplayed} handleClick={handleClick} />
        <FormOne pageDisplayed={pageDisplayed} handleClick={handleClick} />
        <FormTwo pageDisplayed={pageDisplayed} handleClick={handleClick} />
        <FormThree pageDisplayed={pageDisplayed} handleClick={handleClick} />
        <ConfirmationPage pageDisplayed={pageDisplayed} handleClick={handleClick} />
      </div>
    );
  }
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
        <input className='form-input' type='text' placeholder='name'></input>
        <input className='form-input' type='text' placeholder='e-mail'></input>
        <input className='form-input' type='text' placeholder='password'></input>
        <input className='form-input' type='button' onClick={() => { props.handleClick(2) }} value='Next'></input>
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
        <input className='form-input' type='text' placeholder='line one'></input>
        <input className='form-input' type='text' placeholder='line two'></input>
        <input className='form-input' type='text' placeholder='City'></input>
        <input className='form-input' type='text' placeholder='State'></input>
        <input className='form-input' type='text' placeholder='Zip Code'></input>
        <input className='form-input' type='text' placeholder='Phone Number'></input>
        <input type='button' onClick={() => { props.handleClick(3) }} value='Next'></input>
      </form>
    </div>

    : null
}

const FormThree = (props) => {
  return props.pageDisplayed === 3 ?
    <div>
      <h4>Your Payment Information</h4>
      <form className='input-form'>
        <input className='form-input' type='text' placeholder='CC#' />
        <input className='form-input' type='text' placeholder='CVV' />
        <input className='form-input' type='text' placeholder='Billing Zip Code' />
        <input type='button' value='Next' onClick={() => { props.handleClick(4) }}></input>
      </form>
    </div>
    : null
}

const ConfirmationPage = (props) => {
  return props.pageDisplayed === 4 ?
    <div>
      <h3>Confirmation!</h3>
    </div>
    : null
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);