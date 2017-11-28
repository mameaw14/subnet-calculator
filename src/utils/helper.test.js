import { expect } from 'chai';
import { 
    convertToSubnet, 
    networkAddress,
    toBinary,
    broadcastAddress,
    numberOfHosts,
    numberOfUsableHosts,
    wildCard
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

//().toString(2)
//parseInt("101",2)
//a.map((num, index) => {
//    return num + 1;
//});
// .filter((num) => {return num%2 == 0});
// .split('.');
// .join('.');