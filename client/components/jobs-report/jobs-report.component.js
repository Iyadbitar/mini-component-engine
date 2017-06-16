import Component  from '../../core/component';
import View from '../../core/view'
import isEqual from 'lodash.isequal';

import template from './jobs-report.component.html';
import style from './jobs-report.component.css';
import { UpdateJobsPageAction, JobsSearchLoadAction} from '../../actions/jobs-load.action';

const EMPTY_TEMPLATE = '<!--empty-job-report-->';

class JobsReportComponent extends Component {

  constructor(store) {
    super(store);
    this.view = new View(EMPTY_TEMPLATE, this, style);
    this.store.subscribe(this.onStateChange.bind(this));
  }

  componentDidMount() {
    // this.store.dispatch(JobsLoadAction());
  }

  getInitialModel() {
    return {}
  }

  mapStateToModel(state) {
    const prevClass =  state.jobs.meta.page == 1 ? 'disabled' : '';

    const nextClass = state.jobs.meta.page == state.jobs.meta.totalPages ? 'disabled' : ''
    return { ...state.jobs.meta, prevClass, nextClass };
  }

  onStateChange(newState, oldState) {
    const newModel= this.mapStateToModel(newState);
    if(!isEqual(newModel, this.model)){
      this.model = newModel
      this.view = new View(template, this, style);
      this.render();
    }
  }


  prevClick(direction) {
    let newPage = --this.model.page < 1 ? 1 : this.model.page
    this.store.dispatch(UpdateJobsPageAction(newPage))
    this.store.dispatch(JobsSearchLoadAction());

  }

  nextClick(){
    let newPage = ++this.model.page > this.model.totalPages ? this.model.totalPages : this.model.page
    this.store.dispatch(UpdateJobsPageAction(newPage))
    this.store.dispatch(JobsSearchLoadAction());
  }
}


export default JobsReportComponent;
