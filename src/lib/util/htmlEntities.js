export const htmlEntities = (/** @type { string } */ stringData) => {
    return stringData.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/"/g, "&apos;");
}