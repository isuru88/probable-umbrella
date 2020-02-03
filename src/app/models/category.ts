import { Asset } from './asset';

export class Category {
  name: string;
  assets: Asset[];

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
