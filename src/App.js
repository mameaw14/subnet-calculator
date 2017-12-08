import React, { Component } from 'react';
import './App.css';
import { 
  ipValidator,
  subnetValidator,
  randomIP,
  randomSubnet,
  getResult
} from './utils/helper';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


class App extends Component {
  state = {
    ip: '', 
    subnet: '',
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
      }
    );
    } else {
      this.setState({
        validator: 'Invalid Ip address or Subnet mask'
      });
    }
  }
  constructor() {
    super();
    this.state.ip = randomIP();
    this.state.subnet = randomSubnet();
    this.state.result = getResult(this.state.ip, this.state.subnet)
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
        <ReactTable
          showPagination={false}
          data={result}
          className='-striped -highlight table'
          sortable={false}
          defaultPageSize={16}
          columns={[{
            Header: 'Attribute',
            accessor: 'name',
          }, {
            Header: 'Value',
            accessor: 'value',
          }
        ]}
        />
      </div>
    );
  }
}

export default App;
