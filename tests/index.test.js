const {
    productsList,
    sortProducts,
    sortDescending,
    sortAscending,
    noValue,
    memoize,
} = require("../index");

const options = { size: 5 };
let sortFn;

beforeEach(() => {
    sortFn = memoize(sortProducts);
});

test("Should return highest and lowest objects", () => {
    const result = sortFn(productsList, options);

    expect(result.highest.length).toBe(5);
    expect(result.lowest.length).toBe(5);
});

test("Highest's first item should be the highest price", () => {
    const result = sortFn(productsList, options);
    const sortedByPrice = [...productsList].sort(sortDescending);

    expect(result.highest[0]).toMatchObject(sortedByPrice[0]);
});

test("Highest's last item should be the fifth in price descending", () => {
    const result = sortFn(productsList, options);
    const sortedByPrice = [...productsList].sort(sortDescending);

    expect(result.highest[options.size - 1]).toMatchObject(
        sortedByPrice[options.size - 1]
    );
});

test("Highest's first item should be the highest price", () => {
    const result = sortFn(productsList, options);
    const sortedByPrice = [...productsList].sort(sortDescending);

    expect(result.highest[0]).toMatchObject(sortedByPrice[0]);
});

test("Lowest's first item should be the Lowest price", () => {
    const result = sortFn(productsList, options);
    const sortedByPrice = [...productsList].sort(sortAscending);

    expect(result.lowest[0]).toMatchObject(sortedByPrice[0]);
});

test("Lowest's last item should fifth item in price ascending", () => {
    const result = sortFn(productsList, options);
    const sortedByPrice = [...productsList].sort(sortAscending);

    expect(result.lowest[options.size - 1]).toMatchObject(
        sortedByPrice[options.size - 1]
    );
});

test("Should return highest and lowest with null value if no list is provided", () => {
    const result = sortFn();

    expect(result).toEqual(noValue);
});

test("Should return highest and lowest with null value if an empty list is provided", () => {
    const result = sortFn([]);

    expect(result).toEqual(noValue);
});

test("Should return hightest: null, lowest: null if the list.length is less than the size", () => {
    const result = sortFn([{ price: 1 }], { size: 2 });

    expect(result).toEqual(noValue);
});

test("Should return hightest: null, lowest: null if the size is 0", () => {
    const result = sortFn(productsList, { size: 0 });

    expect(result).toEqual(noValue);
});

test("Should give priority to the highest if size is more than half of the list", () => {
    const size = productsList.length / 2 + 2;
    const result = sortFn(productsList, { size });
    const sortedByPrice = [...productsList].sort(sortDescending);
    const expected = sortedByPrice.slice(0, size);

    expect(result.highest).toEqual(expected);
    expect(result.lowest).toBeNull();
});

test("Should return highest: null, lowest: null if called second time with same params", () => {
    sortFn(productsList);
    const result = sortFn(productsList);

    expect(result).toEqual(noValue);

    sortFn(productsList, { size: 4 });
    const result1 = sortFn(productsList, { size: 4 });

    expect(result1).toEqual(noValue);
});
