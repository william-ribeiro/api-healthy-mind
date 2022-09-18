import { hash } from 'bcryptjs';
import lodash from 'lodash';
import util from 'util';
import { CONFIG_PASSWORD, PAGINATION } from '../constants';
import { AppError } from '../errors';

export const parsePage = (page: string) => {
  let _page = page !== undefined ? parseInt(page.toString(), 10) : PAGINATION.OFFSET;

  if (_page === 0) _page = 1;

  return _page;
};

export const parseName = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map((x) => {
      return x[0].toUpperCase() + x.slice(1);
    })
    .join(' ')
    .trim();
};

export const toCamelCase = (object: any) => {
  const camelCaseObject =
    (Array.isArray(object) && object.map(toCamelCase)) ||
    (typeof object === 'object' && lodash.mapKeys(object, (_, key) => lodash.camelCase(key)));
  return (
    (camelCaseObject &&
      ((Array.isArray(camelCaseObject) && camelCaseObject) ||
        Object.keys(camelCaseObject).reduce((result, key) => {
          const current =
            typeof camelCaseObject[key] === 'boolean' && !camelCaseObject[key]
              ? false
              : camelCaseObject[key];
          const value =
            typeof camelCaseObject[key] !== 'boolean' && !current
              ? null
              : (Array.isArray(current) && current.map(toCamelCase)) ||
                (typeof current === 'object' && toCamelCase(current)) ||
                current;

          return { ...result, [key]: value };
        }, {}))) ||
    object
  );
};

export const removeSpecialCharactersFromString = (text: string) => {
  return (
    text &&
    text
      .normalize('NFD')
      .replace(/([\u0300-\u036f])/g, '')
      .toLowerCase()
      .trim()
  );
};

export const filterDefinedProperties = (data: any) => {
  return Object.keys(data).reduce(
    (filteredData, key) =>
      data[key] === undefined ? filteredData : { ...filteredData, [key]: data[key] },
    {},
  );
};

export const logFullObject = (object: any) => util.inspect(object, false, null, true);

export const range = (n: any) => [...Array(n).keys()];

export const buildClusters = (elements: any, clusterLength = 10) => {
  if (!elements || !Array.isArray(elements) || !elements.length) return [];

  const clusters = range(Math.ceil(elements.length / clusterLength)).map((index) =>
    elements.slice(index * clusterLength, index * clusterLength + clusterLength),
  );

  return clusters;
};

export const payloadValidate = (payload: any) => {
  if (typeof 'object' && !Object.values(payload).length) throw new AppError('Invalid payload');
  const keys = Object.keys(payload);

  Object.values(payload).map((value, index) => {
    if (keys[index] !== 'enabled') {
      if (!value) throw new Error(`Invalid ${keys[index]}`);
    }
  });
};

export const generatePasswordHash = (password: string) =>
  hash(password.trim(), CONFIG_PASSWORD.SALT);
