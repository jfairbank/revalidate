// @flow
/* eslint-disable */

declare type CombineValidatorsOptions = {
  serializeValues?: (values: any) => Object,
  nullWhenValid?: boolean,
};

declare type Config = {
  field?: any,
  message?: string,
};

declare type ComposeConfig = Config & {
  multiple?: boolean,
};

declare type ParsedField = {
  isArray: boolean,
  baseName: string,
  fullName: string,
};

declare type ValidatorFactoryConfig = {
  definition: ValidatorImpl,
  messageCreator?: MessageCreator,
  numArgs?: number,
};

declare type MessageCreator = string | (field: any, ...args: Array<any>) => any;
declare type ValidatorImpl = (message: any, ...args: Array<any>) => (value: any, allValues?: ?Object) => any;
declare type Comparer = (a: any, b: any) => boolean;

declare type ConfiguredValidator = (value?: any, allValues?: ?Object) => any;
declare type UnconfiguredValidator = (config?: string | Config, value?: any, allValues?: Object) => any;
declare type ConfiguredCombinedValidator = (value?: any, allValues?: any) => any;

declare type CurryableValidator = (config?: string | Config) => ConfiguredValidator;
declare type ComposedCurryableValidator = (config?: string | ComposeConfig) => ConfiguredValidator;

declare type ConfigurableValidator = UnconfiguredValidator & CurryableValidator;
declare type ValidatorFactory = (...args: Array<any>) => ConfigurableValidator;

declare function createValidatorFactory(
  curriedDefinition: ValidatorImpl,
  defaultMessageCreator?: MessageCreator,
): ValidatorFactory;

declare function createValidatorFactory(config: ValidatorFactoryConfig): ValidatorFactory;

declare type Validator
  = ConfiguredValidator
  & UnconfiguredValidator;
