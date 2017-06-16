import AppComponent  from './components/app/app.component';

import JobsListComponent  from './components/jobs-list/jobs-list.component';
import JobDetailsComponent from './components/job-details/job-details.component';
import JobsSearchComponent from './components/jobs-search/jobs-search.component';
import JobsReportComponent from './components/jobs-report/jobs-report.component';

import Store from './core/store';
import jobsReducer from './reducers/jobs.reducer';
import { ConfigLoadAction, LOAD_CONFIG_TYPE } from './actions/cofing-load.action';

import InitialState from './core/initial-state';

const store = new Store(jobsReducer, InitialState);
store.dispatch(ConfigLoadAction())

const jobsList = new JobsListComponent(store);
jobsList.renderOn(document.getElementById('jobs-list'));

const jobDetails = new JobDetailsComponent(store);
jobDetails.renderOn(document.getElementById('job-details'));

const jobsSearch = new JobsSearchComponent(store);
jobsSearch.renderOn(document.getElementById('jobs-search'));

const jobsReport = new JobsReportComponent(store);
jobsReport.renderOn(document.getElementById('jobs-report'));
