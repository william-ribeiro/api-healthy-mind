import { create } from './create';
import { filter } from './filter';
import { listAll } from './listAll';
import { patientInfo } from './patientInfo';
import { remove } from './remove';
import { update } from './update';

export const patients = { ...listAll, ...filter, ...patientInfo, ...create, ...update, ...remove };
