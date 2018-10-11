const algorithm = {
  /** 
   * Summary. Sort an array by key using the bubble algorithm.
   *
   * Description. Sort an array by key using the bubble algorithm. This function modifies
   * the input Array.
   *
   * @param {Array}   arr                Array to be sorted. Example: [{name:'first',arriveTime:1,burnTime:2}]
   * @param {string}  key                attribute used to sort the input Array.
   * 
   * @return {Array}  Example: [{name:'first',arriveTime:1,burnTime:2}]
   */
  bubbleSort: (arr, key) => {
    for (let i = (arr.length-1); i >= 0; i--)
    {
      for (let j = 1; j <= i; j++)
      {
        if (arr[j-1][key] > arr[j][key])
        {
          let temp = arr[j-1];
          arr[j-1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  },
  /** 
   * Summary. Sort an array by keys using the bubble algorithm.
   *
   * Description. Sort by keys in ascending order using the bubble algorithm. 
   * The sorting depends on the order of the keys. The first key will take precendence
   * over the second, the second over the third, etc. 
   *
   * @param {Array}  arr                 Array of objects to be sorted. Example: [{name:'first',arriveTime:1,burnTime:2}]
   * @param {Array}  keys                Array of keys (String) used to sort the input Array in ascending order. Example: ["arriveTime","burnTime"]
   * 
   * @return {Array}  Example: [{name:'first',arriveTime:1,burnTime:2}]
   */
  bubbleSortMultiple: function(arr, keys) {
    if( arr.length > 1 )
    {
      keys.reverse().forEach( (k,index) => {
        this.bubbleSort(arr,k);
      });
    }
    return arr;
  },
  /** 
   * Summary. Sort an array using the Shortest Job First Non-preemptive algorithm.
   *
   * Description. First, this function sorts in ascending order an array of processes by 
   * arriveTime and BurnTime respectively using the quickSort algorithm. Then, it uses 
   * the sorted array to calculate waitingTime and turnaraoundTime for each process. 
   * Finally, it returns the sorted array including waitingTime and TurnaroundTime.
   *
   * @param {Array}   proc               Array to be sorted. Example: [{name:'first',arriveTime:1,burnTime:2}]
   * @param {string}  arriveTime         string used for arriveTime in the input Array.
   * @param {string}  burnTime           string used for burnTime in the input Array.
   * @param {string}  waitingTime        string to be used for waitingTime in the output Array.
   * @param {string}  turnaroundTime     string to be used for turnaroundTime in the output Array.
   * 
   * @return {Array}  Example: [{name:'first',arriveTime:1,burnTime:2,waitingTime:0,turnAroundTime:2}]
   */
  getSJFOrderedElements: function(proc, arriveTime = "arriveTime", burnTime = "burnTime", waitingTime = "waitingTime", turnaroundTime = "turnaroundTime") {
    let sjfArr = [];
    // Sort array by arriveTime, and burnTime in ascending order
    let processes = proc.sort( (first, second) => {
      // If (first[arriveTime] - second[arriveTime]) returns 0, then, it continues to (first[burnTime] - second[burnTime])
      // however, if a non-zero value is returned in the first comparison, it won't continue to the second one
      return (first[arriveTime] - second[arriveTime]) || (first[burnTime] - second[burnTime]);
    });

    if( processes.length > 0 )
    {
      let firstProcess = processes[0];
      firstProcess[waitingTime] = 0; // because the first process does not wait
      firstProcess[turnaroundTime] = firstProcess[waitingTime] + firstProcess[burnTime];
      sjfArr.push(firstProcess);

      for ( let i = 1; i < processes.length; i++ )
      {
        let currentProcess = processes[i];
        let previousArriveTime = sjfArr[i-1][arriveTime];
        let previousTurnaroundTime = sjfArr[i-1][turnaroundTime];
        let previousTotalTime = previousArriveTime + previousTurnaroundTime;
        currentProcess[waitingTime] = (currentProcess[arriveTime] > previousTotalTime) ? 0:(previousTotalTime - currentProcess[arriveTime]);
        currentProcess[turnaroundTime] = currentProcess[waitingTime] + currentProcess[burnTime];
        sjfArr.push(currentProcess);
      }
    }
    return sjfArr;
  }
}

export default algorithm;