import { Producto } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Detail: { producto: Producto };
};