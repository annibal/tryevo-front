export default function formDataToObject(formData) {
  let object = {};

  function debug(...args) {
    // console.log(...args);
  };

  /**
   * Parses FormData key xxx`[x][x][x]` fields into array
   */
  const parseKey = (key) => {
    const subKeyIdx = key.indexOf("[");

    if (subKeyIdx !== -1) {
      const keys = [key.substring(0, subKeyIdx)];
      key = key.substring(subKeyIdx);

      for (const match of key.matchAll(/\[(?<key>.*?)]/gm)) {
        keys.push(match.groups.key);
      }
      return keys;
    } else {
      return [key];
    }
  };

  /**
   * Recursively iterates over keys and assigns key/values to object
   */
  const assign = (keys, value, object) => {
    const key = keys.shift();
    debug('assign', {key, value, object, keys})

    // When last key in the iterations
    if (key === "" || key === undefined) {
      return object.push(value);
    }

    if (Reflect.has(object, key)) {
      debug("hasKey " + key);
      // If key has been found, but final pass - convert the value to array
      if (keys.length === 0) {
        if (!Array.isArray(object[key])) {
          debug("isArray " + object[key]);
          object[key] = [object[key], value];
          return;
        }
      }
      // Recurse again with found object
      return assign(keys, value, object[key]);
    }

    // Create empty object for key, if next key is '' do array instead, otherwise set value
    if (keys.length >= 1) {
      debug(`undefined '${key}' key: remaining ${keys.length}`);
      object[key] = keys[0] === "" ? [] : {};
      return assign(keys, value, object[key]);
    } else {
      debug("set value: " + value);
      object[key] = value;
    }
  };

  for (const pair of formData.entries()) {
    assign(parseKey(pair[0]), pair[1], object);
  }

  function parseObjArray(obj) {
    return Object.entries(obj).reduce( (all, [key, value]) => {
      if (value && typeof value === 'object' && Object.keys(value).every(k => !isNaN(k)) ) {
          all[key] = Object.values(value).map(x => parseObjArray(x));
      } else {
          all[key] = value
      }
      return all;
    }, {})
  }

  return parseObjArray(object);
}
