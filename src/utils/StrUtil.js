export const rTabs = str => str.trim().replace(/^ {4}/gm, '');

export const isEmptyObj = obj => Object.keys(obj).length === 0