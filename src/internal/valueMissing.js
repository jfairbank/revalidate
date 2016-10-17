// @flow
export default function valueMissing(value: any): boolean {
  return value == null || (typeof value === 'string' && value.trim() === '');
}
