const helper = {
  /** 
   * Summary. Get Total sum of burnTimes.
   *
   * Description. This function takes an array of objects as an input 
   * and sums every burnTime of each object. Finally, it returns the
   * total sum of burnTimes.
   *
   * @param {Array}  row       Array of objects.
   * 
   * @return {Number}
   */
  getTotalBurnTime : (rows) => {
    let total = 0;
    rows.forEach( (row, idx) => {
      total += row.burnTime;
    });
    return total;
  },
  /** 
   * Summary. Remove non-numeric characters from strings.
   *
   * Description. This function converts a string to array. Then, it removes
   * any non-numeric character using a regex.
   * Finally, it converts the array back to a string and returns it.
   *
   * @param {String}  key      string to be filtered.
   * 
   * @return {String}
   */
  filterNonNumericCharacters: key => {
    const regexNumber = new RegExp('^[0-9]+$');// Accept only numbers
    return key.split('').filter(c => regexNumber.test(c)).join('');
  }
}

export default helper;