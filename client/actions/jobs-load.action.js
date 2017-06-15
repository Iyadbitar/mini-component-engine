import JobsService from '../services/jobs.service';
export const ASYNC_LOAD_JOBS_TYPE = 'ASYNC_LOAD_JOBS';
export const JobsLoadAction = () => {
  return {
    type: ASYNC_LOAD_JOBS_TYPE,
    payload: {},
    promise: (getState, dispatch) => () => {
      const { config, uiState } = getState();
      const jobsService = new JobsService();
      return jobsService.get(config.apiUrl + jobsService.urls.all, uiState.sort)
        .then( jobsData => dispatch(UpdateJobsAction(jobsData)) )
    }
  }
}

export const UPDATE_JOBS_TYPE = 'UPDATE_JOBS';
export const UpdateJobsAction = (jobs) => {
  return {
    type: UPDATE_JOBS_TYPE,
    payload : { jobs }
  }
}

export const ASYNC_LOAD_JOB_DETAILS_TYPE = 'ASYNC_LOAD_JOB_DETAILS';
export  const JobsDetailsLoadAction = (jobId) => {
  return {
    type: ASYNC_LOAD_JOB_DETAILS_TYPE,
    payload: {},
    promise: (getState, dispatch) => () => {
      const { config, uiState } = getState();
      const jobsService = new JobsService();
      return jobsService.get(config.apiUrl + jobsService.urls.jobDetails + jobId)
        .then( jobsData => dispatch(UpdateJobDetailsAction(jobsData)) )
    }
  }
}

export const UPDATE_JOB_DETAILS_TYPE = 'UPDATE_JOB_DETAILS';
export const UpdateJobDetailsAction = (job) => {
  return {
    type: UPDATE_JOB_DETAILS_TYPE,
    payload : { job }
  }
}

export const UPDATE_SEARCH_TYPE = 'UPDATE_SEARCH';
export const UpdateSearchAction = (search) => {

  return {
    type: UPDATE_SEARCH_TYPE,
    payload : { searchValue:search }
  }
}

export const ASYNC_JOBS_SEARCH_TYPE = 'ASYNC_JOBS_SEARCH';
export  const JobsSearchLoadAction = () => {
  return {
    type: ASYNC_JOBS_SEARCH_TYPE,
    payload: {},
    promise: (getState, dispatch) => () => {
      const { config, uiState } = getState();
      const jobsService = new JobsService();

      return jobsService.get(config.apiUrl + jobsService.urls.all, {...uiState.sort, ...uiState.search})
        .then( jobsData => dispatch(UpdateJobsAction(jobsData)) )
    }
  }
}
