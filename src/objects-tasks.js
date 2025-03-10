/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const copy = {};
  return Object.assign(copy, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  return Object.fromEntries(
    objects.reduce((acc, obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (acc.find(([k]) => k === key) && typeof value === 'number') {
          const index = acc.findIndex(([k]) => k === key);
          acc[index][1] += value;
        } else {
          acc.push([key, value]);
        }
      });
      return acc;
    }, [])
  );
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const objCopy = { ...obj };
  keys.forEach((key) => {
    if (key in objCopy) {
      delete objCopy[key];
    }
  });
  return objCopy;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const wordMap = {};

  Object.entries(lettersObject).forEach(([letter, positions]) => {
    positions.forEach((position) => {
      wordMap[position] = letter;
    });
  });

  const sortedKeys = Object.keys(wordMap).sort((a, b) => a - b);
  return sortedKeys.map((key) => wordMap[key]).join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  let change = 0;

  return queue.every((bill) => {
    if (bill === 25) {
      change += 25;
      return true;
    }
    if (bill === 50) {
      if (change < 25) {
        return false;
      }
      change -= 25;
      return true;
    }
    if (bill === 100) {
      if (change < 75) {
        return false;
      }
      change -= 75;
      return true;
    }
    return false;
  });
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const data = JSON.parse(json);
  const obj = Object.create(proto);

  Object.keys(data).forEach((key) => {
    obj[key] = data[key];
  });

  return obj;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.sort(
    (a, b) => a.country.localeCompare(b.country) || a.city.localeCompare(b.city)
  );
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  return array.reduce((multimap, item) => {
    const key = keySelector(item);
    const value = valueSelector(item);

    (multimap.get(key) || multimap.set(key, []).get(key)).push(value);

    return multimap;
  }, new Map());
}

class CSSSelector {
  constructor() {
    this.parts = {
      element: null,
      id: null,
      classes: [],
      attributes: [],
      pseudoClasses: [],
      pseudoElements: [],
    };
    this.order = [];
  }

  checkOrder(part) {
    const orderMap = {
      element: 1,
      id: 2,
      classes: 3,
      attributes: 4,
      pseudoClasses: 5,
      pseudoElements: 6,
    };

    if (
      this.order.length > 0 &&
      orderMap[part] < orderMap[this.order[this.order.length - 1]]
    ) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }

    this.order.push(part);
  }

  element(value) {
    if (this.parts.element) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.checkOrder('element');
    this.parts.element = value;
    return this;
  }

  id(value) {
    if (this.parts.id) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.checkOrder('id');
    this.parts.id = value;
    return this;
  }

  class(value) {
    this.checkOrder('classes');
    this.parts.classes.push(value);
    return this;
  }

  attr(value) {
    this.checkOrder('attributes');
    this.parts.attributes.push(value);
    return this;
  }

  pseudoClass(value) {
    this.checkOrder('pseudoClasses');
    this.parts.pseudoClasses.push(value);
    return this;
  }

  pseudoElement(value) {
    if (this.parts.pseudoElements.length > 0) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.checkOrder('pseudoElements');
    this.parts.pseudoElements.push(value);
    return this;
  }

  stringify() {
    const parts = [];

    if (this.parts.element) {
      parts.push(this.parts.element);
    }

    if (this.parts.id) {
      parts.push(`#${this.parts.id}`);
    }

    parts.push(...this.parts.classes.map((className) => `.${className}`));
    parts.push(...this.parts.attributes.map((attribute) => `[${attribute}]`));
    parts.push(
      ...this.parts.pseudoClasses.map((pseudoClass) => `:${pseudoClass}`)
    );
    parts.push(
      ...this.parts.pseudoElements.map((pseudoElement) => `::${pseudoElement}`)
    );

    return parts.join('');
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CSSSelector().element(value);
  },

  id(value) {
    return new CSSSelector().id(value);
  },

  class(value) {
    return new CSSSelector().class(value);
  },

  attr(value) {
    return new CSSSelector().attr(value);
  },

  pseudoClass(value) {
    return new CSSSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CSSSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    const combined = new CSSSelector();
    combined.parts.element = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return combined;
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
