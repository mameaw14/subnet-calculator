import React, { Component } from 'react';
import './App.css';
import { 
  ipValidator,
  subnetValidator,
  getResult
} from './utils/helper';


class App extends Component {  
  state = {
    ip: '192.168.0.1', 
    subnet: 1,
    validator: '',
    result: []
  };

  onIpChange = event => { 
    let ip = event.target.value;
    this.setState({ ip: ip });
    this.updateResult(ip, this.state.subnet);
  }

  onSubnetChange = event => {
    let subnet = event.target.value;
    this.setState({ subnet: subnet });
    this.updateResult(this.state.ip, subnet);
  }

  updateResult = (ip, subnet) => {
    if (ipValidator(ip) && subnetValidator(subnet)) {
      this.setState({
        validator: ip,
        result: getResult(ip, subnet)
      });
    } else {
      this.setState({
        validator: 'Invalid ip'
      });
    }
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
        <h1>Subnet Calculator</h1>
        <form>
          <div className="formgroup">
          <label> IP address <br/>
            <input className="input--text" type="text" name="ip" value={ip} onChange={this.onIpChange} />
          </label>
          </div>
          <div className="formgroup">
          <label> Subnet mask <br/>
            <input className="input--text" type="text" name="subnetmask" value={subnet} onChange={this.onSubnetChange}/>
          </label>
          </div>
        </form>
        <div>{validator}</div>
        <div>{result.map(val => 
          <div> {val.key} : {val.value}</div>
        )}</div>
      </div>
    );
  }
}

export default App;
