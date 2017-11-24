import React, { Component } from 'react';
import './App.css';

class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {ipaddress: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ipaddress: event.target.value});
  }
  
  render() {
    return (
      <div className="App">
        <form>
          <label> IP address
            <input type="text" name="ipaddress" value={this.state.ipaddress} onChange={this.handleChange} />
          </label>
          <label> Subnet mask
            <input type="text" name="subnetmask" />
          </label>
        </form>
        <div>{this.state.ipaddress}</div>
      </div>
    );
  }
}

export default App;
