import { PAGINATION } from '../constants';
import util from 'util';

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
