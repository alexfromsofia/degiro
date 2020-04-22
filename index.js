const products = [
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

/**
    * @params [Array] products - list of products
    * @params [Number] options.size - Optional parameter. By default it
    should be 5
    **/
function sortProducts(products, options = { size: 5 }) {
    const highest = [];
    const lowest = [];
    const { size } = options;

    if (!products || products.length < size * 2) {
        return { highest: null, lowest: null };
    }

    const length = products.length;

    const sortedProducts = products.sort((a, b) => a.price - b.price);

    highest.push(
        ...sortedProducts
            .slice(length - size, length)
            .sort((a, b) => b.price - a.price)
    );
    lowest.push(...sortedProducts.slice(0, size));

    return { highest, lowest };
}

module.exports = {
    products,
    sortProducts,
};
