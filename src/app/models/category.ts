import { Asset } from './asset';

export class Category {
  name: string;
  assets: Asset[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
