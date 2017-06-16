import { LOAD_CONFIG_TYPE } from '../actions/cofing-load.action';
import { ASYNC_LOAD_JOBS_TYPE,
  UPDATE_JOBS_TYPE,
  ASYNC_LOAD_JOB_DETAILS_TYPE,
  UPDATE_JOB_DETAILS_TYPE,
  UPDATE_SEARCH_TYPE,
  ASYNC_JOBS_SEARCH_TYPE,
  CHANGE_JOBS_PAGE_TYPE } from '../actions/jobs-load.action';


import { ASYNC_ACTIVE_TYPE } from '../actions/async-active.action';

function jobsReducer(state, action) {
  switch(action.type){
    case LOAD_CONFIG_TYPE:
      const config = action.payload
      return {...state, config};
    case ASYNC_LOAD_JOBS_TYPE:
      return state;
    case UPDATE_JOBS_TYPE:
      const jobs = action.payload.jobs;
      return { ...state, jobs };
    case ASYNC_ACTIVE_TYPE:
      let uiState = {...state.uiState}
      uiState = {...uiState, ...action.payload}
      return {...state, uiState }
    case UPDATE_JOB_DETAILS_TYPE:
      let jobDetails = {...action.payload.job}
      return {...state, jobDetails};
    case UPDATE_SEARCH_TYPE:
      let search = { ...state.uiState.search, ...action.payload.search};
      let pagination = {...state.uiState.pagination, ...action.payload.pagination};
      var uiState  = {...state.uiState, search, pagination}
      return { ...state, uiState};
    case ASYNC_JOBS_SEARCH_TYPE:
      return state;
    case CHANGE_JOBS_PAGE_TYPE:
      var uiState = {...state.uiState};
      uiState.pagination.page = action.payload.page;
      return {...state, uiState};
    default:
      return state;
  }
}
export default jobsReducer;
