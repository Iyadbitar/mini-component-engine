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

    // create dom tree from template template string
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

    // do the *repeat stuff
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
        if(functionName.indexOf('{') > -1 && functionName.indexOf('}') > -1){
          functionName = functionName.replace(/[{}]/g, '');
          element.removeAttribute(eventName);

          if(this.controller[functionName]){
            element.addEventListener(eventName.replace(/^on/g, '').toLowerCase(), this.controller[functionName].bind(this.controller))
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
