const productsList = [
    { id: 1, price: 10 },
    { id: 2, price: 11 },
    { id: 3, price: 1 },
    { id: 4, price: 3 },
    { id: 5, price: 1 },
    { id: 6, price: 8 },
    { id: 7, price: 3 },
    { id: 8, price: 0 },
    { id: 9, price: 4 },
    { id: 10, price: 5 },
    { id: 11, price: 9 },
    { id: 12, price: 13 },
];

const noValue = { highest: null, lowest: null };

/**
 * Will sort ascending an array of objects with priority to price and then to id
 * @param {Object} a
 * @param {Object} b
 */
const sortAscending = (a, b) => {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;

    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
};

/**
 * Will sort descending an array of objects with priority to price and then to id
 * @param {Object} a
 * @param {Object} b
 */
const sortDescending = (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;

    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
};

/**
 * Basic memoize function which takes advantage of clojures.
 * If inner function is called with different arguments it will store
 * them in the cache. If called with the same args, we get the result from cache.
 * @param {Function} cb
 */
const memoize = (cb) => {
    const cache = {};

    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        if (cache[stringifiedArgs]) {
            return { highest: null, lowest: null };
        }

        const result = cb(...args);
        cache[stringifiedArgs] = result;

        return result;
    };
};

/**
    * @params [Array] products - list of products
    * @params [Number] options.size - Optional parameter. By default it
    should be 5
    **/
function sortProducts(products, options = { size: 5 }) {
    const { size } = options;

    // Return nullish objects if no products are provided,
    // size lower than 1, or size is more than the products
    if (!products || size <= 0 || size > products.length) {
        return { highest: null, lowest: null };
    }

    const highest = [];
    let lowest = [];
    const length = products.length;
    // Sort products in ascending order for convenience.
    const sortedProducts = [...products].sort(sortAscending);

    highest.push(
        ...sortedProducts.slice(length - size, length).sort(sortDescending)
    );

    // If there are enough products for the "lowest" list, populate it,
    // otherwise return it with null value
    if (size * 2 < sortedProducts.length) {
        lowest.push(...sortedProducts.slice(0, size));
    } else {
        lowest = null;
    }

    return { highest, lowest };
}

module.exports = {
    productsList,
    memoize,
    sortProducts,
    sortDescending,
    sortAscending,
    noValue,
};
