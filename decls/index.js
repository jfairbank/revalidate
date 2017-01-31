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

declare type MessageCreator = string | (field: any) => any;
declare type ValidatorImpl = (message: any) => (value: any, allValues?: ?Object) => any;
declare type Comparer = (a: any, b: any) => boolean;

declare type ConfiguredValidator = (value?: any, allValues?: ?Object) => any;
declare type UnconfiguredValidator = (config?: string | Config, value?: any, allValues?: Object) => any;
declare type ConfiguredCombinedValidator = (value?: any, allValues?: any) => any;

declare type CurryableValidator = (config?: string | Config) => ConfiguredValidator;
declare type ComposedCurryableValidator = (config?: string | ComposeConfig) => ConfiguredValidator;

declare type ConfigurableValidator = UnconfiguredValidator & CurryableValidator;

declare type Validator
  = ConfiguredValidator
  & UnconfiguredValidator;
