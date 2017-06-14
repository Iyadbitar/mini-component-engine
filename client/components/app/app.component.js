import Component  from '../../core/component';
import View from '../../core/view'

import template from './app.component.html';
import style from './app.component.css';

class AppComponent extends Component {

  constructor(store) {
    super(store);

    this.view = new View(template, this, style);

    console.log('App component constructor 5')
  }

  getInitialModel() {
    return {title:'App!'}
  }

  onStateChange(newState, oldState) {
    Object.assign(this.model, newState);
    this.render();
  }

  clickme(event) {
    this.store.dispatch({
      type: 'CHANGE_TITLE',
      payload: {
        title: 'Appppp! ' + Math.random()
      }
    })
  }

  clickme2(event) {
    this.store.dispatch({
      type: 'CHANGE_TITLE',
      payload: {
        title: 'Appppp! :)'
      }
    })
  }

}


export default AppComponent;
