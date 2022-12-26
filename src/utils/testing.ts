export const random_items_from_array = <T>(arr: T[], count = 1): T[] => {
    const rand = Math.floor(Math.random() * arr.length);

    const _arr = [...arr];

    const [_item] = _arr.splice(rand, 1);

    if (count === 1) return [_item];

    return [_item, ...random_items_from_array(_arr, count - 1)];
};
