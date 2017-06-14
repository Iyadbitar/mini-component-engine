// import ComponentHandler from './core/ComponentHandler';
import AppComponent  from './components/app/app.component';
import Store from './core/store';

const initialState = {
  jobs: {
    data: [],
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
    case 'ADD_JOB':
      const jobs = {
        data: state.jobs.data.concat(action.payload.data)
      }
      return {...state, jobs};
    case 'CHANGE_TITLE':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

var store = new Store(reducer, initialState)

var app = new AppComponent(store);

app.mountOn(document.getElementById('app-wrapper'))
