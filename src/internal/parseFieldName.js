export default function parseFieldName(fieldName) {
  const isArray = fieldName.indexOf('[]') > -1;
  const baseName = isArray ? fieldName.replace('[]', '') : fieldName;

  return {
    isArray,
    baseName,
    fullName: fieldName,
  };
}
