import Component  from '../../core/component';
import View from '../../core/view'
import isEqual from 'lodash.isequal';

import template from './job-details.component.html';
import style from './job-details.component.css';
import { UpdateJobDetailsAction } from '../../actions/jobs-load.action';
//
const EMPYT_TEMPLATE = '<!--nothing-->';

class JobDetailsComponent extends Component {

  constructor(store) {
    super(store);
    this.view = new View(EMPYT_TEMPLATE, this, style);
    this.store.subscribe(this.onStateChange.bind(this));
  }

  componentDidMount() {
    // this.store.dispatch(JobsLoadAction());
  }

  getInitialModel() {
    return {}
  }

  mapStateToModel(state) {
    return { ...state.jobDetails };
  }

  onStateChange(newState, oldState) {
    const newModel= this.mapStateToModel(newState);

    if(!isEqual(newModel, this.model)){
      this.model = newModel
      this.view = isEqual(this.model, {}) ? new View(EMPYT_TEMPLATE, this, style) : new View(template, this, style);
      this.render();
    }
  }

  closeDetails() {
    this.store.dispatch(UpdateJobDetailsAction({}))
  }

}


export default JobDetailsComponent;
