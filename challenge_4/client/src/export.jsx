import App from './index.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const Index = () => {
  return (
    <div>
      <App/>
    </div>
  )
}

ReactDOM.render(<Index/>, document.getElementById('root'));