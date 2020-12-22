const clean = ( obj: any ) => {
    Object.getOwnPropertyNames(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
    return true;
}

export { clean }