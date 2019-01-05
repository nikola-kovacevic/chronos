export const isEquivalent = (firstObject: any, secondObject: any) => {
  if (!firstObject) {
    return false;
  }

  const firstObjectProperties = Object.keys(firstObject);
  const secondObjectProperties = Object.keys(secondObject);

  if (firstObjectProperties.length !== secondObjectProperties.length) {
    return false;
  }

  for (let i = 0; i < firstObjectProperties.length; i++) {
    const property = firstObjectProperties[i];

    if (firstObject[property] !== secondObject[property]) {
      return false;
    }
  }

  return true;
};
