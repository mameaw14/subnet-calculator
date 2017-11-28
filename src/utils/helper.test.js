import { expect } from 'chai';
import { 
    convertToSubnet, 
    networkAddress,
    toBinary,
    broadcastAddress,
    numberOfHosts,
    numberOfUsableHosts,
    wildCard,
    ipBit,
    convertToIPFormat,
    hostMin,
    hostMax,
    ipValidator
} from './helper';

describe('convertToSubnet test', () => {
    it('should return subnet mask', () => {
        expect(convertToSubnet(32)).to.equal('255.255.255.255');
    });
})

describe('wildcard test', () => {
    it('should return wildcard', () => {
        expect(wildCard(32)).to.equal('0.0.0.0');
    });
})

describe('networkAddress test', () => {
    it('should return network address', () => {
        expect(networkAddress('255.255.255.255',1)).to.equal('128.0.0.0');
        expect(networkAddress('255.255.255.255',8)).to.equal('255.0.0.0');
        expect(networkAddress('234.255.255.255',8)).to.equal('234.0.0.0');
    });
})

describe('toBinary test', () => {
    it('should return binary format ip', () => {
        expect(toBinary('128.0.0.0')).to.equal('10000000.00000000.00000000.00000000');
    });
})

describe('broadcastAddress test', () => {
    it('should return broadcast address', () => {
        expect(broadcastAddress('108.104.24.1', 8)).to.equal('108.255.255.255');
        expect(broadcastAddress('108.104.24.1', 9)).to.equal('108.127.255.255');
    });
})

describe('numberOfHosts test', () => {
    it('should return number of hosts', () => {
        expect(numberOfHosts(9)).to.equal(8388608);
    });
})

describe('numberOfUsableHosts test', () => {
    it('should return number of usable hosts', () => {
        expect(numberOfUsableHosts(9)).to.equal(8388606);
    });
})

describe('ipBit test', () => {
    it('should return ip bit integer', () => {
        expect(ipBit('255.255.255.255')).to.equal(4294967295);
    });
})

describe('convertToIPFormat test', () => {
    it('should return ip format', () => {
        expect(convertToIPFormat(4294967295)).to.equal('255.255.255.255');
    });
})

describe('hostMax test', () => {
    it('should return hostmin address', () => {
        expect(hostMax('108.104.24.1', 8)).to.equal('108.255.255.254');
        expect(hostMax('108.104.24.1', 9)).to.equal('108.127.255.254');
    });
})

describe('hostMin test', () => {
    it('should return hostmin address', () => {
        expect(hostMin('255.255.255.255', 1)).to.equal('128.0.0.1');
        expect(hostMin('255.255.255.255', 8)).to.equal('255.0.0.1');
        expect(hostMin('234.255.255.255', 8)).to.equal('234.0.0.1');
    });
})

describe('ip validator test', () => {
    it('should return true/false', () => {
        expect(ipValidator('192.168.0.1')).to.equal(true);
    })
})


//().toString(2)
//parseInt("101",2)
//a.map((num, index) => {
//    return num + 1;
//});
// .filter((num) => {return num%2 == 0});
// .split('.');
// .join('.');