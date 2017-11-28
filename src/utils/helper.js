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

export const subnetMaskBit = (mask) => {
    return parseInt('1'.repeat(mask) + '0'.repeat(32 - mask), 2);
}

export const ipBit = (ip) => {
    let number = 0;
    let a = ip.split('.').map((val, index) => {
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