import ComponentHandler from './core/ComponentHandler';
import AppComponent  from './components/app/app.component.js';

const handler = new ComponentHandler();
handler.render(AppComponent, document.getElementById('app-wrapper'))
// const appComponent = new AppComponent();
// const app2: new AppComponent();

// appComponent.mountOn(document.getElementById('app-wrapper'));
