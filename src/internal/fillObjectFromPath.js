import assign from 'object-assign';

export default function fillObjectFromPath(object, path, finalValue) {
  if (path.length <= 0) {
    return finalValue;
  }

  const [head, ...tail] = path;

  return assign({}, object, {
    [head]: fillObjectFromPath(object[head] || {}, tail, finalValue),
  });
}
