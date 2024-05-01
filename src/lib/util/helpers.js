/**
 * @param {{ apply: (arg0: any, arg1: any[]) => void; }} callback
 * @param {number | undefined} wait
 */
export function debounce(callback, wait) {
    /**
     * @type {string | number | NodeJS.Timeout | undefined}
     */
    let timeout;
    return (/** @type {any[]} */ ...args) => {
        // @ts-ignore
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}