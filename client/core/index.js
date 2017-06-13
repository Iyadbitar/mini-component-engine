
function Component (config) {
  return function(target) {
    target.prototype.mountingPoint = null;
    target.prototype.isMounted = false;
    target.prototype.templateString = config.template;
    target.prototype.activeTempate = '';
    target.prototype.domTree = null;
    target.prototype.eventsBindingList = [];
    target.prototype.dataBindingList = [];


    target.prototype.selector = config.selector;

    target.prototype.setDomTree = () => {
      target.domTree = document.createElement('div');
      target.domTree.innerHTML = target.prototype.templateString;
      const allowedEvents = ['onClick', 'onChange', 'onSubmit'];
      allowedEvents.forEach( (eventName) => {
        target.domTree.querySelectorAll(`[${eventName}]`).forEach( element => {
          let functionName = element.attributes[eventName].value
          if(functionName.indexOf('{') > -1 && functionName.indexOf('}') > -1){
            functionName = functionName.replace(/[{}]/g, '');
            element.removeAttribute(eventName)
            if(target.prototype[functionName]){
              target.prototype.eventsBindingList.push({
                eventName: eventName.replace(/^on/g, '').toLowerCase(),
                functionName: functionName,
                element: element
              })
            }
            else{
              throw `"${eventName}" handler method "${functionName}" is not a memeber of ${target.name} component`;
            }
          }
        })
      })
    }

    // target.prototype.setDomTree();


    target.prototype.setMountingPoint = (domPoint) => {
      target.mountingPoint = domPoint;
    }

    target.prototype.mount = () => {
      if(target.prototype.componentWillMount){
        target.prototype.componentWillMount();
      }
      console.log(target.domTree)
      target.mountingPoint.appendChild(target.domTree);
      target.isMounted = true;

      if(target.prototype.componentDidMount){
        target.prototype.componentDidMount();
      }
    }

    target.prototype.mountOn = (domPoint) => {
      target.prototype.setMountingPoint.call(target, domPoint);
      target.prototype.mount.call(target);
    }

    target.prototype.unmount = () => {
      target.mountingPoint.innerHTML('');
      target.isMounted = false;
    }

    target.prototype.render = () => {
      console.log(target.prototype);
    }

  }
}

export default Component
