const initialState = {
  engineerchat: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const engineerchat = (state = initialState, action) => {
  switch (action.type) {
    // get engineer
    case 'GET_ENGINEERCHAT_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_ENGINEERCHAT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_ENGINEERCHAT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        engineerchat: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default engineerchat;
