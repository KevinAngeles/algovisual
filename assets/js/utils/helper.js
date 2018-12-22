
/**
 * Summary. Get Total sum of burnTimes.
 *
 * Description. This function takes an array of objects as an input
 * and sums every burnTime of each object. Finally, it returns the
 * total sum of burnTimes.
 *
 * @param {Array}  row       Array of objects.
 *
 * @return {Number} burnTimesSum
 */
export const getTotalBurnTime = rows => {
  return rows.reduce( (total, row) => (total + row.burnTime), 0 );
};
/**
 * Summary. Remove non-numeric characters from strings.
 *
 * Description. This function converts a string to array. Then, it removes
 * any non-numeric character using a regex.
 * Finally, it converts the array back to a string and returns it.
 * The original string is left unchanged.
 *
 * @param {String}  key      string to be filtered.
 *
 * @return {String} newString
 */
export const filterNonNumericCharacters = key => {
  const regexNumber = new RegExp('^[0-9]+$');// Accept only numbers
  return key.split('').filter(c => regexNumber.test(c)).join('');
};
