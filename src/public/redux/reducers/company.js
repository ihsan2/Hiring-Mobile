const initialState = {
  company: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const company = (state = initialState, action) => {
  switch (action.type) {
    // get engineer by id
    case 'GET_COMPANY_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_COMPANY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        company: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default company;
