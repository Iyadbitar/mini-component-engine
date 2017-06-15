import HttpService from './http.service';
const http = new HttpService();
let instance = null;

class JobsService {

  urls = {
    schema: 'dob-jobs/schema/',
    jobDetails: 'dob-jobs/job/',
    all: 'dob-jobs/'
  }

  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;

  }

  get(url, query) {
    return http.get(url, query)
  }

}

export default JobsService;
