import Components from '../components';

let instance = null;

class ComponentHandler {

  components = {}

  constructor() {
    if(!instance){
      instance = this;
    }
    this.components = Object.keys(Components).reduce( (acc, name) => {
      acc[Components[name].selector] = Components[name];
      return acc;
    },{});

    console.log(this.components)
    return instance;
  }

  bindComponentEvents(componentInstance) {
    componentInstance.eventsBindingList.forEach( bind => {
      bind.element.addEventListener(bind.eventName, componentInstance[bind.functionName].bind(componentInstance))
    })
  }

  setComponentProperties(componentInstance) {
    Object.keys(componentInstance).forEach( key => {
      componentInstance.activeTempate = componentInstance.templateString.replace(new RegExp(`\{${key}\}`, 'g'), componentInstance[key]);
    })

    // console.log(componentInstance.activeTempate)
  }

  render(componentClass, mountingPoint) {
    const component = new componentClass();

    this.setComponentProperties(component)
    component.setDomTree();
    this.bindComponentEvents(component)

    component.mountOn(mountingPoint)
  }
}

export default ComponentHandler
