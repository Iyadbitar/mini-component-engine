import Component  from '../../core/component';
import View from '../../core/view'

import template from './jobs-list.component.html';
import style from './jobs-list.component.css';

class JobsListComponent extends Component {

  constructor(store) {
    super(store);

    this.view = new View(template, this, style);

    this.store.subscribe(this.onStateChange.bind(this))

    console.log('this a job list component')
  }

  getInitialModel() {
    return {
      data:[]
    }
  }

  mapStateToMode(state) {
    return { data: state.jobs.data };
  }

  onStateChange(newState, oldState) {
    Object.assign(this.model, this.mapStateToMode(newState));
    this.render();
  }

}


export default JobsListComponent;
