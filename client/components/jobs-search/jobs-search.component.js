import Component  from '../../core/component';
import View from '../../core/view'
import isEqual from 'lodash.isequal';

import template from './jobs-search.component.html';
import style from './jobs-search.component.css';
import { UpdateSearchAction, JobsSearchLoadAction } from '../../actions/jobs-load.action';


class JobsSearchComponent extends Component {

  searchValue = '';

  constructor(store) {
    super(store);
    this.view = new View(template, this, style);
    this.store.subscribe(this.onStateChange.bind(this));
  }

  componentDidMount() {
    // this.store.dispatch(JobsLoadAction());
  }

  getInitialModel() {
    return {}
  }

  mapStateToModel(state) {
    return { ...state.uiState.search };
  }

  onStateChange(newState, oldState) {
    const newModel= this.mapStateToModel(newState);

    if(!isEqual(newModel, this.model)){
      this.model = newModel
      this.render();
    }
  }

  searchClick(){
    if(this.searchValue.length > 2){
      this.store.dispatch(UpdateSearchAction(this.searchValue));
      this.store.dispatch(JobsSearchLoadAction());
    }

  }

  searchValueChange(event) {
    this.searchValue = event.target.value
  }

}


export default JobsSearchComponent;
