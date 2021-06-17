/**
 *
 * @param filters
 * @returns :
 *  - true : filters contain values.
 * - false : all filters are empty
 */
export const filtersAreDirty = (filters: { [key: string]: unknown }) => {
  return Object.values(filters).some(val => {
    if (typeof val == 'number' && val != -1) {
      return true;
    }
    if (typeof val == 'string' && val != '') {
      return true;
    }
    return false;
  });
};
