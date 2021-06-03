import lodashDefaultsDeep from 'lodash.defaultsdeep';
import { defaultConfig } from './default';
import { applicationConfig } from './application';
import { resolver, Props, Config } from './resolver';

const mergedConfig: Props = lodashDefaultsDeep(applicationConfig, defaultConfig);

export const config: Config = resolver(mergedConfig);
