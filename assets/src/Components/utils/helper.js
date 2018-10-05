const helper = {
  getTotalBurnTime : (rows) => {
    let total = 0;
    rows.forEach( (row, idx) => {
      total += row.burnTime;
    });
    return total;
  }
}

export default helper;