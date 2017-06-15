class View {
  template = '';
  controller = null;
  domTree = null;
  style = null;

  constructor(template, controller, style) {
    this.template = template;
    this.controller = controller;
    this.style = style;
  }

  render(model) {
    // replace placeholder with values
    let activeTemplate = Object.keys(model).reduce( (template, key) => {
      return template.replace(new RegExp(`\{${key}\}`, 'g'), model[key])
    }, this.template);

    // // execute funciions call
    // let functions = activeTemplate.match(/\{.*\(.*\)\}/g);
    // if(Array.isArray(functions)){
    //   activeTemplate = functions.reduce( (template, funcStr) => {
    //     var funcName = funcStr.replace(/\(.*\)|\{|\}/g, '')
    //     var varName = funcStr.replace(/^.*\(|\)|\{|\}/g, '');
    //     if(this.controller[funcName]){
    //       const value = this.controller[funcName].call(this.controller, model[varName] || null);
    //       console.log(model[varName])
    //       template = template.replace(funcStr, this.controller[funcName].call(this.controller, model[varName] || null))
    //     }
    //     return template;
    //   }, activeTemplate)
    // }

    // create dom tree from template string
    const domType = {
      [true]: 'div',
      [activeTemplate.match(/^<tr?/g) !== null]: 'tbody'
    }[true];
    this.domTree = document.createDocumentFragment();
    var tempDiv = document.createElement(domType);
    tempDiv.innerHTML = activeTemplate;
    while(tempDiv.childNodes.length > 0) {
      this.domTree.appendChild(tempDiv.childNodes[0]);
    }

    // do the data-repeat stuff
    this.domTree.querySelectorAll('[data-repeat]').forEach( (element) => {
      const repeatModel = model[element.attributes['data-repeat'].value];
      if(!repeatModel) {
        throw `Couldn't locate data-repeat property in model of ${this.controller.name}`
      }
      if(!Array.isArray(repeatModel)) {
        throw `data-repeat is not Array in model of ${this.controller.name}`
      }

      element.removeAttribute('data-repeat');
      const targetPoint = element.parentElement;
      const html = element.outerHTML;

      repeatModel.forEach( m => {
        const view = new View(html, this.controller, this.style);
        targetPoint.appendChild(view.render(m));
      })
      targetPoint.removeChild(element)
    })

    // set style encapsulation
    this.domTree.querySelectorAll('[class]').forEach( (element) => {
      let newClassProp = element.attributes.class.value.split(' ').map( (className) => {
        return this.style[className] ? this.style[className] : className;
      })
      element.attributes.class.value = newClassProp.join(' ');
    })

    // bind dom event to controller functions
    const allowedEvents = ['onClick', 'onChange', 'onSubmit'];
    allowedEvents.forEach( (eventName) => {
    this.domTree.querySelectorAll(`[${eventName}]`).forEach( element => {
        let functionName = element.attributes[eventName].value
        if(functionName.indexOf('[') > -1 && functionName.indexOf(']') > -1){
          // check if there is apramenter need to be passed to event handler
          let paramName = null;
          functionName = functionName.replace(/\((.*)\)/g, (match, p1) => {
            if(p1) {
              paramName = p1
            }
            return match;
          })

          functionName = functionName.replace(/[\[\]]|\(.*\)/g, '');
          element.removeAttribute(eventName);
          if(this.controller[functionName]){

            const eventHandler = paramName ?
              (param) => (event) => this.controller[functionName].call(this.controller, param, event)
              : () => (event) => this.controller[functionName].call(this.controller, event);
            element.addEventListener(eventName.replace(/^on/g, '').toLowerCase(), eventHandler(model[paramName]))
          }
          else{
            throw `"${eventName}" handler method "${functionName}" is not a memeber of ${this.name} component`;
          }
        }
      })
    })

    return this.domTree;
  }

}

export default View;
