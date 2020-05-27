'use babel';
const fs = require("fs-extra")
$ = jquery = require("jquery")


export default class MascotMinicharView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('mascot-minichar');
    //atom.views.getView(atom.workspace).append(this.getElement())
    this.setMascot(atom.config.get('atom-mini-mascot-char.imagePath'));
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setMascot(filepath){
    let idx = filepath.lastIndexOf('.');
    console.log(idx)
    let contentType;
    let extensions = filepath.substr(idx).replace('.','');
    switch(extensions.toLowerCase()) {
      case "png": contentType = "image/png";break;
      case "gif": contentType = "image/gif";break;
      default: contentType = "image/jpeg"
    }
    let file2base64 = fs.readFileSync(filepath, 'base64');
    let data = `url("data:${contentType};base64,${file2base64}")`
    this.element.style.backgroundImage = data
  }

  toggle(){
      $(this.element).toggle(800)
  }
}
