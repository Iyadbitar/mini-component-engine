class Component {

  isMounted = false;
  view = null;
  mountingPoint = null;
  store = null;
  currentDomTree = null;
  model = {};

  constructor(store){
    this.store = store;
    if(this.onStateChange){
      this.store.subscribe(this.onStateChange.bind(this))
    }
    if(this.getInitialModel) {
      this.model = this.getInitialModel();
    }
  }

  setMountingPoint(domPoint) {
    this.mountingPoint = domPoint;
  }

  mount() {
    this.currentDomTree = this.view.render(this.model || this.getInitialModel() || {});
    this.mountingPoint.appendChild(this.currentDomTree);
    this.isMounted = true;
  }

  mountOn(domPoint) {
    this.setMountingPoint(domPoint);
    this.mount();
  }

  unmount() {
    this.mountingPoint.innerHTML('');
    this.isMounted = false;
  }

  render() {
    const newDomTree = this.view.render(this.model);
    if(this.isMounted) {
      this.mountingPoint.replaceChild(newDomTree, this.currentDomTree);
      this.currentDomTree = newDomTree;
    }
  }

}

export default Component;
