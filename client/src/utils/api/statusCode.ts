/*
  * @description: check if string starts with a 4** or 5** status code
  * @param {string} code - status code
  * @returns {boolean} - true if status code is 4** or 5**
  * @example isHttpError(400) // true
 */
const isHttpError = (str: string) => {
  if (!str) return false;
  const convert = str.toString();
  return convert.startsWith('4') || convert.startsWith('5');
};

export default isHttpError;
