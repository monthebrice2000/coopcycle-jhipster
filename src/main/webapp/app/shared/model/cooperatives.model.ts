import { IZones } from '@/shared/model/zones.model';

export interface ICooperatives {
  id?: number;
  nom?: string;
  zone?: IZones | null;
}

export class Cooperatives implements ICooperatives {
  constructor(public id?: number, public nom?: string, public zone?: IZones | null) {}
}
