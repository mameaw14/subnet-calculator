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
    ip = toBinary(ip);
    const a = ip.split('.').map((element) => {
        const b = element.split('').map((digit) => {
            subnet -= 1;
            return subnet >= 0? digit : '0';
        });
        return parseInt(b.join(''), 2);
    });
    return a.join('.');
}

export const broadcastAddress = (ip, subnet) => {
    ip = toBinary(ip);
    const a = ip.split('.').map((element) => {
        const b = element.split('').map((digit) => {
            subnet -= 1;
            return subnet >= 0? digit : '1';
        });
        return parseInt(b.join(''), 2);
    });
    return a.join('.');
}

export const numberOfHosts = (subnet) => {
    return Math.pow(2, 32-subnet);
}

export const numberOfUsableHosts = (subnet) => {
    return Math.pow(2, 32-subnet) - 2;
}

export const wildCard = (mask) => {
    const subnet = [0, 0, 0, 0].map(() => {
        const sub = '00000000'.split('').map(() => {
            mask -= 1;
            return mask >= 0 ? '0' : '1';
        });
        return parseInt(sub.join(''), 2);
    });
    return subnet.join('.');
}