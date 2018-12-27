import { UPDATE_SELECTED_ALGORITHM } from '../actions/types';

export const initialState = {
  selected: {
    id: 'fifo',
    name: 'First In First Out (FIFO)',
    description: 'FIFO is a scheduling algorithm that execute the processes as they come in regardles of their burn time. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.',
    type: 'Preemptive',
  },
  scheduling: [
    {
      id: 'fifo',
      name: 'First In First Out (FIFO)',
      description: 'FIFO is a scheduling algorithm that execute the processes as they come in regardles of their burn time. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.',
      type: 'Preemptive',
    },
    {
      id: 'sjf',
      name: 'Shortest Job First (SJF)',
      description: 'SJF is a scheduling algorithm that selects the waiting process with the smallest execution time to execute next. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.',
      type: 'Non Preemptive',
    }
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_ALGORITHM: {
      const algorithmId = action.algorithm;
      const selectedAlgorithm = state.scheduling.find( algorithm => (algorithm.id === algorithmId) );
      return { ...state, selected: {...selectedAlgorithm} };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
