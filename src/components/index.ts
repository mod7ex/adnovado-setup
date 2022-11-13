const modules = import.meta.glob("@/*.tsx", { eager: true });

export default Object.entries(modules).reduce((prev, [key, value]) => {
    return {
        ...prev,
        [key.replace(/.*\//i, "").replace(".tsx", "")]: value,
    };
}, {});
