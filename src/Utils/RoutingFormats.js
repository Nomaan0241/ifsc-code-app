export function slugConverter(name) {
    return name.toLowerCase().split(' ').join('_');
}

export function nameConverter(name) {
    return name.toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function capitalizeConverter(name) {
    return name.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function objectToIfscDataCapitalizeConverter(obj) {
    let objArray = {};
    for (let [key, value] of Object.entries(obj)) {
        if (key !== 'IFSC' && typeof value === 'string') {
            objArray[key] = capitalizeConverter(value);
        } else {
            objArray[key] = value;
        }
    }
    return objArray;
}


