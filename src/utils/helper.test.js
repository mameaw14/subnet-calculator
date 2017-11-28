import { convertToSubnet } from './helper';
import { expect } from 'chai';

describe('convertToSubnet test', () => {
    it('should return subnet mask', () => {
        expect(convertToSubnet(32)).to.equal('255.255.255.255');
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