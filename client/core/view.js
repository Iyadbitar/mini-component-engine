class View {
  template = '';
  controler = null;
  domTree = null;
  style = null;

  constructor(template, controler, style) {
    this.template = template;
    this.controler = controler;
    this.style = style;
  }

  render(model) {
    // replace placeholder with values
    let activeTemplate = Object.keys(model).reduce( (template, key) => {
      return template.replace(new RegExp(`\{${key}\}`, 'g'), model[key])
    }, this.template);

    // creat dom tree out of template
    this.domTree = document.createElement('div');
    this.domTree.innerHTML = activeTemplate;

    // bind dom event to controler functions
    const allowedEvents = ['onClick', 'onChange', 'onSubmit'];
    allowedEvents.forEach( (eventName) => {
    this.domTree.querySelectorAll(`[${eventName}]`).forEach( element => {
        let functionName = element.attributes[eventName].value
        if(functionName.indexOf('{') > -1 && functionName.indexOf('}') > -1){
          functionName = functionName.replace(/[{}]/g, '');
          element.removeAttribute(eventName);

          if(this.controler[functionName]){
            element.addEventListener(eventName.replace(/^on/g, '').toLowerCase(), this.controler[functionName].bind(this.controler))
          }
          else{
            throw `"${eventName}" handler method "${functionName}" is not a memeber of ${this.name} component`;
          }
        }
      })
    })

    // set style encapsulation
    this.domTree.querySelectorAll('[class]').forEach( (element) => {
      let newClassProp = element.attributes.class.value.split(' ').map( (className) => {
        return this.style[className] ? this.style[className] : className;
      })
      element.attributes.class.value = newClassProp.join(' ');
    })

    return this.domTree;
  }

}

export default View;
