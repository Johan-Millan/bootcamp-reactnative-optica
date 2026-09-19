import { Glasses } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Detail: { item: Glasses };
  Create: undefined;
  Edit: { id: number };
  Settings: undefined;
};
