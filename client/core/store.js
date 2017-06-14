let instance = null;

class Store {
  state = null;
  reducer = null;
  handlers = [];
  middlewares = [];

  constructor(reducer, initialState) {
    this.reducer = reducer;

    this.state = initialState;
    this.dispatch({})

    if(!instance){
      instance = this;
    }
    return instance;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    const oldState = this.state;
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
