import React, { Component } from 'react';
import './App.css';
import { 
  ipValidator,
  getResult
} from './utils/helper';


class App extends Component {  
  state = {
    ip: '192.168.0.1', 
    subnet: 1,
    validator: '',
    result: []
  };

  handleChange = event => { 
    let ip = event.target.value;
    this.setState({
      ip: ip,
    });

    if (ipValidator(ip)) {
      this.setState({
        validator: ip,
        result: getResult(ip, this.state.subnet)
      });
    } else {
      this.setState({
        validator: 'invalid ip'
      });
    }
  }

  onSubnetChange = event => {
    let subnet = event.target.value;
    this.setState({ subnet: subnet });
  }
  
  render() {
    const {
      ip,
      validator,
      subnet,
      result
    } = this.state;
    return (
      <div className="App">
        <form>
          <label> IP address
            <input type="text" name="ip" value={ip} onChange={this.handleChange} />
          </label>
          <label> Subnet mask
            <input type="text" name="subnetmask" value={subnet} onChange={this.onSubnetChange}/>
          </label>
        </form>
        <div>{validator}</div>
        <div>{result.map(val => <div> {val.key} : {val.value}</div>)}</div>
      </div>
    );
  }
}

export default App;
