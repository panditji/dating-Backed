
const authCountry = (countries: any, key: any, val: any) => {
    for (var i = 0; i < countries.length; i++) {
        if (countries[i][key] === val) return true;
    }
    return false;
};

export default authCountry;