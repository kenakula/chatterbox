import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariables } from './evnironment-variables';

export const validateConfig = (configuration: Record<string, unknown>) => {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  for (let i = 0; i < errors.length; i++) {
    Object.values(errors[i].constraints).map(str => {
      console.log(i, str);
    });
    console.log('\n ***** \n');
  }

  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');

  return finalConfig;
};
