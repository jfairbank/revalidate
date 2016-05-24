const sym = typeof Symbol === 'function'
  ? Symbol
  : id => `@@revalidate/${id}`;

export default sym;
