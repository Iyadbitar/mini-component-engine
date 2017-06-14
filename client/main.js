import AppComponent  from './components/app/app.component';
import JobsListComponent  from './components/jobs-list/jobs-list.component';
import Store from './core/store';
import { ConfigLoadAction, LOAD_CONFIG_TYPE } from './actions/cofing-load.action';

const initialState = {
  config: {},
  jobs: {
    data: [
      {
        job__:'one',
        doc__:'doc',
        borough:'borough',
        house: 'house'
      },
      {
        job__:'one1',
        doc__:'doc1',
        borough:'borough1',
        house: 'house1'
      },
      {
        job__:'one2',
        doc__:'doc2',
        borough:'borough2',
        house: 'house2'
      },
      {
        job__:'one3',
        doc__:'doc3',
        borough:'borough3',
        house: 'house3'
      }

    ],
    meta: {}
  },
  sort: {
    column: 'job__',
    direction: 'DESC'
  },
  filter: {
    column: '',
    value: ''
  },
  title:''
}

function reducer(state, action) {
  switch(action.type){
    case LOAD_CONFIG_TYPE:
      const config = action.payload
      return {...state, config};
    default:
      return state;
  }
}

var store = new Store(reducer, initialState);

store.dispatch(ConfigLoadAction)

var jobsList = new JobsListComponent(store);

jobsList.renderOn(document.getElementById('jobs-list'));
