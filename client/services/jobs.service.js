import HttpService from './http.service';
const http = new HttpService();
let instance = null;

class JobsService {

  urls = {
    schema: 'dob-jobs/schema/',
    job: 'dob-jobs/job/',
    all: 'dob-jobs/'
  }

  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;

  }

  getJobs() {
    return http.get('http://localhost:8800/api/' + this.urls.all)
  }
}

export default JobsService;
