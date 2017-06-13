import Component  from '../../core';
import template from './app.component.html';

@Component({
  selector: 'app',
  template: require('./app.component.html'),
  style: require('./app.component.css')
})
class AppComponent {
  title = 'Apppp!';

  constructor() {
    console.log('App component constructor ')
  }

  loadData() {
    console.log('load')
  }

  clickme(event) {
    console.log(this)
    this.loadData();
  }

  componentWillMount() {
    console.log('will')
    this.loadData();
  }
}


export default AppComponent;
