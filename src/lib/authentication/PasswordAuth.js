import { hash, compare } from 'bcrypt';

export const hashPassword = async (/** @type {string | Buffer} */ password) => {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export const verifyPassword = async (/** @type {string} */ password, /** @type {string} */ hashedPassword) => {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}