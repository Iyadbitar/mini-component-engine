class Component {

  isMounted = false;
  view = null;
  mountingPoint = null;
  store = null;
  currentDomTree = null;
  model = {};

  constructor(store){
    this.store = store;

    if(this.getInitialModel) {
      this.model = this.getInitialModel();
    }
  }

  setMountingPoint(domPoint) {
    this.mountingPoint = domPoint;
    this.isMounted = true;

    if(this.componentDidMount){
      this.componentDidMount();
    }
  }

  renderOn(domPoint) {
    this.setMountingPoint(domPoint);
    this.render();
  }

  distory() {
    this.mountingPoint.innerHTML('');
    this.isMounted = false;
  }

  render() {
    if(!this.isMounted) return;
    const newDomTree = this.view.render(this.model);
    if(this.mountingPoint.hasChildNodes() && this.mountingPoint) {
      while(this.mountingPoint.firstChild){
        this.mountingPoint.removeChild(this.mountingPoint.firstChild)
      }
    }
    this.mountingPoint.appendChild(newDomTree);
    this.currentDomTree = newDomTree;
  }

}

export default Component;
