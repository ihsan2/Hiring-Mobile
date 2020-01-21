const initialState = {
  engineer: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const engineer = (state = initialState, action) => {
  switch (action.type) {
    // get engineer by id
    case 'GET_ENGINEER_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_ENGINEER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_ENGINEER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        engineer: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default engineer;
