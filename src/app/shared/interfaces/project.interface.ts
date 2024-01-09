import { User } from './user.interface';

export interface Project {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  constructorClient: User;
  description?: string;
  provider?: User;
  items?: string[];
  images?: string[];
}
