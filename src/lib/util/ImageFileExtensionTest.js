export const ImageFileExtensionTest = (/** @type {null | string} */ fileName) => {

    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
 
    if (fileName === null) {

        return "false";

    };

    if (regex.test(fileName) === true) {

        return "true";

    } else {

        return "false";

    };
    
}