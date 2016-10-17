// @flow
const sym = typeof Symbol === 'function'
  ? Symbol
  : (id: string) => `@@revalidate/${id}`;

export default sym;
