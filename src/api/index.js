// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve(username + "@" + password);
        } else {
          reject("error");
        }
      }, 1500);
    });
  },
  setItem(key, item) {
    localStorage.setItem(key, item);
  },
  getItem(key, item) {
    localStorage.getItem(key, item);
  },
  clearItem(key, item) {
    localStorage.removeItem(key, item);
  },
};
