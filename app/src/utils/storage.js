export default {
  get(key, defaultValue = {}) {
    const value = window.localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return defaultValue;
  },

  set(key, value) {
    window.localStorage.setItem('reduxStore', JSON.stringify(value));
  },
};
