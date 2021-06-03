export const select = (selector, ref = undefined) => {
    let doc = document;
    if (ref) {
        doc = ref;
    }
    const els = doc.querySelectorAll(selector);
    return els.length > 1 ? els : els[0];
};