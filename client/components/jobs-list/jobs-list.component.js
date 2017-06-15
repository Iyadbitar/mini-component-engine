import Component  from '../../core/component';
import View from '../../core/view'
import isEqual from 'lodash.isequal';

import template from './jobs-list.component.html';
import style from './jobs-list.component.css';
import { JobsLoadAction, JobsDetailsLoadAction } from '../../actions/jobs-load.action';

class JobsListComponent extends Component {

  constructor(store) {
    super(store);
    this.view = new View(template, this, style);
    this.store.subscribe(this.onStateChange.bind(this));
  }

  componentDidMount() {
    this.store.dispatch(JobsLoadAction());
  }

  getInitialModel() {
    return {
      data:[]
    }
  }

  mapStateToModel(state) {
    return {
      data: state.jobs.data,
      colClass: isEqual(state.jobDetails, {}) ? 'col-sm-12' : 'col-sm-8',
      selectedId: isEqual(state.jobDetails, {}) ? 0 : state.jobDetails.id
    };
  }

  onStateChange(newState, oldState) {
    const newModel= this.mapStateToModel(newState);
    if(!isEqual(newModel, this.model)){
      Object.assign(this.model, newModel);
      this.render();
    }
  }

  moreClick(id, event) {
    this.store.dispatch(JobsDetailsLoadAction(id));
  }

  getRowClass(id) {
    console.log(id)
    return this.model.selectedId == id ? 'selected' : '';
  }

}


export default JobsListComponent;
