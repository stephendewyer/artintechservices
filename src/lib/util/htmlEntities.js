export const htmlEntities = (/** @type { string | null } */ stringData) => {
    if (stringData === null) {
        return "";
    } else {
        return stringData.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/"/g, "&apos;");
    };    
}