import { AsyncStatusAction } from '../actions/async-active.action';
let instance = null;

class Store {
  state = null;
  reducer = null;
  handlers = [];
  middlewares = [];

  constructor(reducer, initialState) {
    this.reducer = reducer;

    this.state = initialState;
    // this.dispatch({})

    if(!instance){
      instance = this;
    }
    return instance;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    const oldState = this.getState();
    const isAsync = action.promise ? true : false;

    const asyncPromise = isAsync ?
      action.promise(this.getState.bind(this), this.dispatch.bind(this))
      : new Promise( () => true);

    if(isAsync){
      this.dispatch(AsyncStatusAction(true));
      asyncPromise()
      .then(() => {
        this.dispatch(AsyncStatusAction(false));
        this.notify(oldState)
      });
      return;
    }

    this.state = this.reducer(this.state, action);
    this.notify(oldState);
  }

  notify(oldState) {
    this.handlers.forEach( func => func(this.getState(), oldState));
  }

  subscribe(func) {
    this.handlers.push(func);
    func(this.getState())
  }

  use(func) {
    this.middlewares.push(func);
  }
}

export default Store
