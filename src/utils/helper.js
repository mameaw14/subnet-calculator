export const convertToIPFormat = (number) => {
    return (number >>> 24) + '.'
        + ((number >>> 16) & 0xff) + '.'
        + ((number >>> 8) & 0xff) + '.'
        + (number & 0xff);
}

export const convertToSubnet = (mask) => {
    let subnet = '1'.repeat(mask) + '0'.repeat(32-mask);
    subnet = parseInt(subnet.slice(0, 8), 2) + '.' 
        + parseInt(subnet.slice(8, 16), 2) + '.' 
        + parseInt(subnet.slice(16, 24), 2) + '.' 
        + parseInt(subnet.slice(24, 32), 2);
    return subnet;
}

export const binarySubnetMask = (mask) => {
    let subnet = '1'.repeat(mask) + '0'.repeat(32 - mask);
    subnet = subnet.slice(0, 8) + '.'
        + subnet.slice(8, 16) + '.'
        + subnet.slice(16, 24) + '.'
        + subnet.slice(24, 32);
    return subnet
}
export const subnetMaskBit = (mask) => {
    return parseInt('1'.repeat(mask) + '0'.repeat(32 - mask), 2);
}

export const ipBit = (ip) => {
    let number = 0;
    ip.split('.').map((val, index) => {
        number += (val * (1 << (8 * (3 - index))));
    })
    return number;
}

export const toBinary = (ip) => {
    const binary = ip.split('.').map((elem) => {
        const a = (+elem).toString(2);
        return '0'.repeat(8 - a.length) + a;
    });
    return binary.join('.');
}

export const networkAddress = (ip, subnet) => {
    ip = ipBit(ip);
    subnet = subnetMaskBit(subnet);
    return convertToIPFormat(subnet & ip);
}

export const broadcastAddress = (ip, subnet) => {
    ip = ipBit(ip);
    subnet = subnetMaskBit(subnet);
    return convertToIPFormat(subnet & ip | ~subnet);
}

export const numberOfHosts = (subnet) => {
    return Math.pow(2, 32 - subnet);
}

export const numberOfUsableHosts = (subnet) => {
    return Math.pow(2, 32 - subnet) - 2;
}

export const wildCard = (mask) => {
    return convertToIPFormat(~subnetMaskBit(mask));
}

export const hostMin = (ip, subnet) => {
    ip = ipBit(ip);
    subnet = subnetMaskBit(subnet);
    return convertToIPFormat((subnet & ip) + 1);
}

export const hostMax = (ip, subnet) => {
    ip = ipBit(ip);
    subnet = subnetMaskBit(subnet);
    return convertToIPFormat((subnet & ip | ~subnet) - 1);
}

export const getResult = (ip, subnet) => [
    { name: 'IP Address', value: ip },
    { name: 'Network Address', value: networkAddress(ip, subnet) },
    { name: 'Usable Host IP Range', value: hostMin(ip, subnet) + ' - ' + hostMax(ip, subnet) },
    { name: 'Broadcast Address', value: broadcastAddress(ip, subnet) },
    { name: 'Total Number of Hosts', value: numberOfHosts(subnet) },
    { name: 'Number of Usable Hosts', value: numberOfUsableHosts(subnet) },
    { name: 'Subnet Mask', value: convertToSubnet(subnet) },
    { name: 'Wildcard Mask', value: wildCard(subnet) },
    { name: 'Binary Subnet Mask', value: binarySubnetMask(subnet) },
    // { name: 'IP Class', value: getIPClass(subnet) },
    { name: 'CIDR Notation', value: '/' + subnet },
    // { name: 'IP Type', value: isPrivate(ip) ? 'Private' : 'Public' },
    { name: 'Short', value: ip + '/' + subnet },
    { name: 'Binary ID', value: ipBit(ip).toString(2) },
    { name: 'Integer ID', value: ipBit(ip) },
    { name: 'Hex ID', value: ipBit(ip).toString(16) }
].map(obj => ({ ...obj, key: obj.name }));

export const ipValidator = ip => /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)
export const subnetValidator = subnet => subnet >= 1 && subnet <= 32;