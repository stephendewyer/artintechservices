// JWT generation and verification

import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "$env/static/private";

/**
 * @param {UserCredentials} user
 */
export function signAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        }, 
        JWT_ACCESS_SECRET, 
        { expiresIn: "30m" }
    );
};

/**
 * @param {UserCredentials} user
 */
export function signRefreshToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        }, 
        JWT_REFRESH_SECRET, 
        { expiresIn: "7d" }
    );
};

/**
 * @param {string} token
 */
export function verifyAccessToken(token) {
    return jwt.verify(token, JWT_ACCESS_SECRET);
};

/**
 * @param {string} token
 */
export function verifyRefreshToken(token) {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};
