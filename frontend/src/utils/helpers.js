import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_USERNAME } from "./regex";

const MIN_LENGTH = 8;

/**
 * check if email matches with Regex
 * @param email {string}
 * @returns boolean
 */
export function checkEmail(email) {
	return REGEX_EMAIL.test(email);
}

/**
 * check if password matches with Regex
 * @param password {string}
 * @returns boolean
 */
export function checkPassword(password) {
	return REGEX_PASSWORD.test(password);
}

/**
 * @param string {string}
 * @returns {boolean}
 */
export function checkMinLength(string) {
	return string.length > MIN_LENGTH;
}

/**
 * @param username {string}
 * @returns {boolean}
 */
export function checkUsername(username) {
	return REGEX_USERNAME.test(username);
}
