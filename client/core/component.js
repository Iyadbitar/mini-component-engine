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
    const newDomTree = this.view.render(this.model);
    if(!this.isMounted) return;

    if(this.mountingPoint.hasChildNodes()) {
      this.mountingPoint.replaceChild(newDomTree, this.currentDomTree);
    }
    else{
      this.mountingPoint.appendChild(newDomTree);
    }
    this.currentDomTree = newDomTree;
  }

}

export default Component;
