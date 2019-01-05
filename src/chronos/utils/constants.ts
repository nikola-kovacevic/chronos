export const chronicle = {
  set: (target: any, property: any, value: any) => {
    target.chronos.historize({...target});
    if (property !== 'chronos') {
      target[property] = value;
    }
    return true;
  },

  deleteProperty(target: any, property: any) {
    if (property in target) {
      target.chronos.historize({...target});
      if (property !== 'chronos') {
        delete target[property];
      }
      return true;
    }
  },
};