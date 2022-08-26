import moment from 'moment-timezone';

moment.tz.setDefault('America/Sao_Paulo');

export const timeBr = moment();
timeBr.format('YYYY-MM-DD hh:mm:ss');
