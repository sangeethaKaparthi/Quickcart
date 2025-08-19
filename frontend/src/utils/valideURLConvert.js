export const valideURLConvert = (name = "") => {
    const safeName = name
        .toString()
        .trim()
        .replaceAll(" ", "-")
        .replaceAll(",", "-")
        .replaceAll("&", "-");
    return encodeURIComponent(safeName);
};
