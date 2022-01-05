export function generateSortedArray(unsortedArray, sortedArray) {
    if (unsortedArray.length < 1) return;
    let date = getDate(unsortedArray[0].utcDate);
    let nestedArray = unsortedArray.filter(
        (element) => getDate(element.utcDate) === date
    );
    sortedArray.push(nestedArray);
    unsortedArray = unsortedArray.filter(
        (element) => getDate(element.utcDate) !== date
    );
    generateSortedArray(unsortedArray, sortedArray);
}

export function getDate(date) {
    return date.slice(0, -10);
}

export function getTime(date) {
    return date.slice(11, -4);
}
