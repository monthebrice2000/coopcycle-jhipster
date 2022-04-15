import { IRestaurateurs } from '@/shared/model/restaurateurs.model';
import { ICommandes } from '@/shared/model/commandes.model';

export interface IRestaurants {
  id?: number;
  nom?: string;
  carte?: string;
  menu?: string | null;
  restaurateur?: IRestaurateurs | null;
  commandes?: ICommandes[] | null;
}

export class Restaurants implements IRestaurants {
  constructor(
    public id?: number,
    public nom?: string,
    public carte?: string,
    public menu?: string | null,
    public restaurateur?: IRestaurateurs | null,
    public commandes?: ICommandes[] | null
  ) {}
}
