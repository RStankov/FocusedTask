let electron: any = null;

if (window.require) {
  electron = window.require('electron');
}

export default electron;
