import AppComponent  from './components/app/app.component';

import JobsListComponent  from './components/jobs-list/jobs-list.component';
import JobDetailsComponent from './components/job-details/job-details.component';
import JobsSearchComponent from './components/jobs-search/jobs-search.component';

import Store from './core/store';
import jobsReducer from './reducers/jobs.reducer';
import { ConfigLoadAction, LOAD_CONFIG_TYPE } from './actions/cofing-load.action';

const initialState = {
  config: {},
  jobs: {
    data: [],
    meta: {}
  },
  jobDetails: {},
  uiState: {
    activeAsync: false,
    sort: {
      sortBy: 'job__',
      order: 'DESC'
    },
    search: {
      searchIn: 'all',
      searchValue: ''
    }
  }
}


const store = new Store(jobsReducer, initialState);
store.dispatch(ConfigLoadAction())

const jobsList = new JobsListComponent(store);
jobsList.renderOn(document.getElementById('jobs-list'));

const jobDetails = new JobDetailsComponent(store);
jobDetails.renderOn(document.getElementById('job-details'));

const jobsSearch = new JobsSearchComponent(store);
jobsSearch.renderOn(document.getElementById('jobs-search'))
