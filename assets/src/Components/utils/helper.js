const helper = {
  getTotalBurnTime : (rows) => {
    let total = 0;
    rows.forEach( (row, idx) => {
      total += row.burnTime;
    });
    return total;
  },
  /* Sort an array by key using the bubble algorithm
   *
   * arr: array
   * key: string
   * */
  bubbleSort: (arr,key) => {
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
  /* Sort by key in the desired order using the bubble algorithm, and then,
   * if there are more than one element with the same key-value, order by
   * key2, respecting the initial order by key.
   *
   * arr: array
   * key: string
   * key2: string
   * */
  bubbleSortByTwoKeys: function(arr,key,key2) {
    let res = [];

    if( arr.length > 1 )
    {
      let bubbleArr = this.bubbleSort(arr,key);
      let indexes = this.getChangesIndex(bubbleArr,key);
      for(let i = 0; i < indexes.length; i = i + 2 )
      {
        let tmpArr = [];
        for(let j = indexes[i]; j <= indexes[i+1]; j++)
        {
          tmpArr.push( bubbleArr[j] );
        }
        tmpArr = this.bubbleSort(tmpArr,key2);
        for(let j=0;j<tmpArr.length;j++)
        {
          res.push(tmpArr[j]);
        }
      }
      return res;
    }
    else
    {
      return arr;
    }
  },
  getChangesIndex: (arr,key) => {
    let keys = [];

    for (let i = 0; i < arr.length; i++)
    {
      if (i == 0)
      {
        keys.push(i);
      }
      else
      {
        if( i === (arr.length -1) )
        {
          if( arr[i][key] !==  arr[i-1][key] )
          {
            keys.push(arr.length-2);
            keys.push(arr.length-1);
          }
          keys.push(arr.length-1);
        }
        else
        {
          if( arr[i][key] !==  arr[i-1][key] )
          {

            keys.push(i-1);
            keys.push(i);

          }
        }
      }
    }
    return keys;
  },
  /* Sort an array using the Shortest Job First Non-preemptive algorithm
   *
   * proc: array
   * */
  getSJFOrderedElements: function(proc) {
    let arr = [];
    let processes = this.bubbleSortByTwoKeys(proc, "arriveTime", "burnTime");

    if( processes.length > 0 )
    {
      let tmp = processes[0]["arriveTime"] + processes[0]["burnTime"];
      // because the first process does not wait
      processes[0]["waitingTime"] =  0;
      processes[0]["turnaroundTime"] = processes[0]["waitingTime"] + processes[0]["burnTime"];
      arr.push(processes[0]);
      processes.splice(0,1);

      while( processes.length > 0 )
      {
        let processes_length = processes.length;
        // only get the process whose arrive times are lower or equal than the current time
        // if the arrive time is higher, it means that those processes have not arrived yet
        let indexes = [];
        for ( let i = 0; i < processes_length; i++ )
        {
          if( processes[i]["arriveTime"] <= tmp )
          {
            indexes.push(i);
          }
          else
          {
            break;
          }
        }
        // if indexes length is 0, it means that all the process until this time are done,
        // and it is waiting for other process to arrive, so it will take the immediate next process
        let indexToAdd = 0;
        if(indexes.length < 1)
        {

          // here tmp is overridden because the next arrive time is higher than the current time
          tmp = processes[0]["arriveTime"] + processes[0]["burnTime"];

          processes[0]["waitingTime"] =  0;
        }
        else
        {

          let tmpArr = [];

          indexes.forEach( (d,i) => {
            tmpArr.push(processes[d]);
          });

          tmpArr = this.bubbleSortByTwoKeys(tmpArr, "burnTime", "arriveTime");

          for( let i = (indexes[indexes.length-1]+1); i < processes.length; i++ )
          {
            tmpArr.push(processes[i]);
          }
          processes = tmpArr;

          processes[indexToAdd]["waitingTime"] =  tmp - processes[indexToAdd]["arriveTime"];
          tmp = tmp + processes[indexToAdd]["burnTime"];
        }
        processes[indexToAdd]["turnaroundTime"] = processes[indexToAdd]["waitingTime"]+processes[indexToAdd]["burnTime"];
        // Add to result array
        arr.push(processes[indexToAdd]);
        // Remove from remaining processes
        processes.splice(indexToAdd,1);
      }
    }
    return arr;
  }
}

export default helper;