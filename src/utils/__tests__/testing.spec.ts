import { random_items_from_array } from "~/utils/testing";

it("random_items_from_array", () => {
    const items = ["a", "b", "c", "d", "e"];

    expect(random_items_from_array(items).length).toBe(1);

    const random = Math.floor(Math.random() * items.length) + 1;

    const _items = random_items_from_array(items, random);

    expect(_items.length).toBe(random);

    _items.forEach((item) => expect(items).toContain(item));
});
