const removeNullUndefinedObject = (obj: any) => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
};

export default removeNullUndefinedObject;