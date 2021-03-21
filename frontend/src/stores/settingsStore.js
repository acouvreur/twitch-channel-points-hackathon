const { makeObservable, observable, action } = require('mobx');

class SettingsStore {
  constructor() {
    makeObservable(this, {
      darkTheme: observable,
      toggleTheme: action,
    });
  }

  darkTheme = JSON.parse(window.localStorage.getItem('darkTheme')) || false;

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    window.localStorage.setItem('darkTheme', JSON.stringify(this.darkTheme));
  }

  reset() {
    this.darkTheme = false;
    window.localStorage.setItem('darkTheme', JSON.stringify(false));
  }
}

export default new SettingsStore();
