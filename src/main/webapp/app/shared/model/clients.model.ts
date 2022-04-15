import { IRestaurateurs } from '@/shared/model/restaurateurs.model';
import { ICommandes } from '@/shared/model/commandes.model';

export interface IClients {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string | null;
  phoneNumber?: string;
  restaurateur?: IRestaurateurs | null;
  commandes?: ICommandes[] | null;
}

export class Clients implements IClients {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string | null,
    public phoneNumber?: string,
    public restaurateur?: IRestaurateurs | null,
    public commandes?: ICommandes[] | null
  ) {}
}
