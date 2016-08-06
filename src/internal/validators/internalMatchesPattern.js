import createValidator from '../../createValidator';

export default function internalMatchesPattern(regex, messageCreator) {
  return createValidator(
    message => value => {
      if (value && !regex.test(value)) {
        return message;
      }
    },

    messageCreator
  );
}
