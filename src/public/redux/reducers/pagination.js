const initialState = {
  pageDetail: [],
  engineersPage: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const pagination = (state = initialState, action) => {
  switch (action.type) {
    // get pageinatio
    case 'GET_PAGINATION_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_PAGINATION_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_PAGINATION_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        engineersPage: [...state.engineersPage, ...action.payload.data.data],
        pageDetail: action.payload.data.pageDetail,
      };

    default:
      return state;
  }
};

export default pagination;
