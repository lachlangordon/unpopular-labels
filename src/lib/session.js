//Functions for handling session icons

//Check if local storage is available and also if the kiosk header is enabled

const objectsLocalStorageName = 'sip.seenObjects';

const shouldShowSeenIcon = () => {

  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');

    return window.source !== 'kiosk';
  } catch(e) {
    return false;
  }
};

const isObjectSeen = (id) => {
  let seenObjects = localStorage.getItem(objectsLocalStorageName);
  if (seenObjects === null) {
    return false;
  } else {
    try {
      let objects = JSON.parse(seenObjects);

      for (let i = 0; i < objects.length; i++) {
        if (objects[i] === id) {
          return true;
        }
      }

    } catch(e) {
      return false;
    }
  }

  return false;

};

const saveSeenObject = (id) => {

  try {
    let seenObjects = localStorage.getItem(objectsLocalStorageName);

    if (seenObjects === null) {
      localStorage.setItem(objectsLocalStorageName, JSON.stringify([id]));
    } else {
      let objects = JSON.parse(seenObjects);

      let found = false;
      for (let i = 0; i < objects.length; i++) {
        if (objects[i] === id) {
          found = true;
          break;
        }
      }
      if (!found) {
        objects.push(id);
        localStorage.setItem(objectsLocalStorageName, JSON.stringify(objects));
      }
    }


  } catch(e) {
    return false;
  }

};

module.exports = { shouldShowSeenIcon, isObjectSeen, saveSeenObject };