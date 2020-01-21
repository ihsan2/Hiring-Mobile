const initialState = {
  message: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const message = (state = initialState, action) => {
  switch (action.type) {
    // get tes
    case 'GET_MESSAGE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_MESSAGE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_MESSAGE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        message: action.payload.data.data,
      };

    // add
    case 'ADD_MESSAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'ADD_MESSAGE_FULFILLED': {
      return {
        ...state,
        message: [...state.message, action.payload.data],
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'ADD_MESSAGE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }
    // delete MESSAGE
    case 'DELETE_MESSAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'DELETE_MESSAGE_FULFILLED': {
      return {
        ...state,
        message: [],
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'DELETE_MESSAGE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }

    default:
      return state;
  }
};

export default message;
