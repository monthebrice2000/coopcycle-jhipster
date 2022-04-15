import { IRestaurants } from '@/shared/model/restaurants.model';
import { ICooperatives } from '@/shared/model/cooperatives.model';
import { IClients } from '@/shared/model/clients.model';
import { ILivreurs } from '@/shared/model/livreurs.model';

export interface IRestaurateurs {
  id?: number;
  nom?: string;
  prenom?: string;
  city?: string | null;
  restaurants?: IRestaurants[] | null;
  cooperative?: ICooperatives | null;
  client?: IClients | null;
  livreur?: ILivreurs | null;
}

export class Restaurateurs implements IRestaurateurs {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public city?: string | null,
    public restaurants?: IRestaurants[] | null,
    public cooperative?: ICooperatives | null,
    public client?: IClients | null,
    public livreur?: ILivreurs | null
  ) {}
}
