const initialState = {
  companychat: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const companychat = (state = initialState, action) => {
  switch (action.type) {
    // get company
    case 'GET_COMPANYCHAT_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_COMPANYCHAT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_COMPANYCHAT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        companychat: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default companychat;
