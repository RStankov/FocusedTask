export default {
  get(key: string, defaultValue: any = undefined): any {
    const value = window.localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return defaultValue;
  },

  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
