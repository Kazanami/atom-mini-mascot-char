'use babel';

import MascotMinicharView from './atom-mini-mascot-char-view';
import {
  CompositeDisposable
} from 'atom';
import configData from './config.json'

export default {

  mascotMinicharView: null,
  modalPanel: null,
  subscriptions: null,
  config: configData,

  activate(state) {
    this.mascotMinicharView = new MascotMinicharView(state.mascotMinicharViewState);
    /*    this.modalPanel = atom.workspace.addModalPanel({
          item: this.mascotMinicharView.getElement(),
          visible: false
        });*/
    console.log(atom.config)
    console.log(`Active?: ${state}`)
    //atom.views.getView(atom.workspace).classList.add("mascot-minichar")
    //this.init();
    console.log(this.mascotMinicharView.getElement())

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    console.log(atom.config.get('atom-mini-mascot-char.imagePath'))
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mini-mascot-char:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    /*this.modalPanel.destroy();
    this.subscriptions.dispose();*/
    this.mascotMinicharView.destroy();
  },

  serialize() {
    return {
      mascotMinicharViewState: this.mascotMinicharView.serialize()
    };
  },

  toggle() {
    console.log('MascotMinichar was toggled!');
    return document.querySelector(".mascot-minichar") != null ? this.mascotMinicharView.toggle() : this.init()
  },

  init() {
    atom.views.getView(atom.workspace).append(this.mascotMinicharView.getElement())
  },

  /*loadConfig() {
    atom.config.setDefaults("mascot-minichar", imagePath)
  }*/
  reload(){
    this.deactivate()
    this.init()
  },

  loadConfig(){
    atom.config.setDefaults("atom-mini-mascot-char", configData);
  }
};
