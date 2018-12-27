import { expect } from 'chai';
import { UPDATE_SELECTED_ALGORITHM } from '../../assets/js/actions/types';
import reducer from '../../assets/js/reducers/algorithm';

const initialState = {
  selected: {},
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

describe('Algorithm Reducer', () => {
  describe('DEFAULT', () => {
    it('should return the initial state', () => {
      const action = {};
      const expectedState = initialState;
      expect(reducer(initialState, action)).to.deep.equal(expectedState);
    });
  });
  describe('UPDATE_SELECTED_ALGORITHM', () => {
    it('should update selected algorithm if id exists', () => {
      const action = {
        type: UPDATE_SELECTED_ALGORITHM,
        algorithm: 'fifo',
      };
      let expectedState = {...initialState};
      expectedState.selected = {
        id: 'fifo',
        name: 'First In First Out (FIFO)',
        description: 'FIFO is a scheduling algorithm that execute the processes as they come in regardles of their burn time. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.',
        type: 'Preemptive',
      };
      expect(reducer(initialState,action)).to.deep.equal(expectedState);
    });
    it('should not update selected algorithm if id does not exist', () => {
      const action = {
        type: UPDATE_SELECTED_ALGORITHM,
        algorithm: undefined,
      };
      const expectedState = initialState;
      expect(reducer(initialState,action)).to.deep.equal(expectedState);
    });
  });
});
