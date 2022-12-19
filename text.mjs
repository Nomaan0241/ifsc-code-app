function nameConverter(name) {
    return name.toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

console.log(nameConverter("abhyudaya_co-operative_(bank)")) // Abhyudaya Co-Operative Bank