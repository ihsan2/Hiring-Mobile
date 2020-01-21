import {combineReducers} from 'redux';

// import all reducer
import engineers from './engineers';
import companies from './companies';
import login from './login';
import engineer from './engineer';
import company from './company';
import pagination from './pagination';
import message from './message';
import messagecompany from './messagecompany';
import companychat from './companychat';
import engineerchat from './engineerchat';

const rootReducer = combineReducers({
  engineer,
  company,
  engineers,
  companies,
  login,
  pagination,
  message,
  messagecompany,
  companychat,
  engineerchat,
});

export default rootReducer;
