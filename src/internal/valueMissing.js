export default function valueMissing(value) {
  return value == null || (typeof value === 'string' && value.trim() === '');
}
