const initialState = {
  companies: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const companies = (state = initialState, action) => {
  switch (action.type) {
    // get company
    case 'GET_COMPANIES_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_COMPANIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        companies: action.payload.data.data,
      };

    // register company
    case 'REGISTER_COMPANY_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'REGISTER_COMPANY_FULFILLED': {
      return {
        ...state,
        companies: [...state.companies, action.payload.data],
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'REGISTER_COMPANY_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }

    // update company
    case 'UPDATE_COMPANY_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'UPDATE_COMPANY_FULFILLED': {
      return {
        ...state,
        companies: [...state.companies, action.payload.data],
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'UPDATE_COMPANY_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }

    // delete company
    case 'DELETE_COMPANY_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'DELETE_COMPANY_FULFILLED': {
      return {
        ...state,
        companies: [],
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'DELETE_COMPANY_REJECTED': {
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

export default companies;
