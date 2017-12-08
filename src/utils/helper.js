const privateIP = [
    { start: '10.0.0.0', end: '10.255.255.255' },
    { start: '172.16.0.0', end: '172.31.255.255' },
    { start: '192.168.0.0', end: '192.168.255.255' },
];

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

export const subnetToCIDR = (str) => {
    let cidr = 0;
    str.split('.').map( val => {
        (+val).toString(2).split('').map( val => {
            cidr += val==1;
        })
    })
    return cidr;
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
    if (subnet == 32) return 0;
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

export const randomIP = () => {
    let ip = +(Math.random() * 4294967295)
    return convertToIPFormat(ip)
}

export const randomSubnet = () => {
    let subnet = +(Math.random() * 32)
    return convertToSubnet(subnet)
}

export const getIPClass = n => {
    if (n < 8) return 'None';
    else if (n < 16) return 'A';
    else if (n < 24) return 'B';
    return 'C';
}

export const isPrivate = ip => {
    const ipInt = ipBit(ip);
    for (const set of privateIP) {
        if (ipInt >= ipBit(set.start) && ipInt <= ipBit(set.end)) {
            return true;
        }
    }
    return false;
}

export const getResult = (ip, subnet) => {
    subnet = subnetToCIDR(subnet)
    return [
    { name: 'IP Address', value: ip },
    { name: 'Network Address', value: networkAddress(ip, subnet) },
    { name: 'Usable Host IP Range', value: hostMin(ip, subnet) + ' - ' + hostMax(ip, subnet) },
    { name: 'Broadcast Address', value: broadcastAddress(ip, subnet) },
    { name: 'Total Number of Hosts', value: numberOfHosts(subnet) },
    { name: 'Number of Usable Hosts', value: numberOfUsableHosts(subnet) },
    { name: 'Subnet Mask', value: convertToSubnet(subnet) },
    { name: 'Wildcard Mask', value: wildCard(subnet) },
    { name: 'Binary Subnet Mask', value: binarySubnetMask(subnet) },
    { name: 'IP Class', value: getIPClass(subnet) },
    { name: 'CIDR Notation', value: '/' + subnet },
    { name: 'IP Type', value: isPrivate(ip) ? 'Private' : 'Public' },
    { name: 'Short', value: ip + '/' + subnet },
    { name: 'Binary ID', value: ipBit(ip).toString(2) },
    { name: 'Integer ID', value: ipBit(ip) },
    { name: 'Hex ID', value: ipBit(ip).toString(16) }
].map(obj => ({ ...obj, key: obj.name }))
};

export const ipValidator = ip => /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)
export const subnetValidator = subnet => /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/.test(subnet);