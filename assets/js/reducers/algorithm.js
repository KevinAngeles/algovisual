import { SELECT_ALGORITHM } from '../actions/types';

const initialState = {
  selected: {
    name: 'Shortest Job First (SJF)',
    description: 'SJF is a scheduling algorithm that selects the waiting process with the smallest execution time to execute next. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.',
    type: 'Non Preemptive',
  },
  schedulling: [
    {
      name: 'First In First Out (FIFO)',
      description: 'SJF is a scheduling algorithm that selects the waiting process with the smallest execution time to execute next. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.',
      type: 'Preemptive',
    },
    {
      name: 'Shortest Job First (SJF)',
      description: 'SJF is a scheduling algorithm that selects the waiting process with the smallest execution time to execute next. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.',
      type: 'Non Preemptive',
    }
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ALGORITHM: {
      return { ...state, selected: action.algorithm };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
