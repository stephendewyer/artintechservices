export const DocumentFileExtensionTest = (/** @type {null | string} */ fileName) => {

    let regex = new RegExp(/[^\s]+(.*?).(pdf|PDF)$/);
 
    if (fileName === null) {

        return "false";

    };

    if (regex.test(fileName) === true) {

        return "true";

    } else {

        return "false";

    };
    
}