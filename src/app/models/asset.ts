export class Asset {
  asset: string;     
  title: string;
  subtitle: string;
  cover_path: string;
  runtime: number;
  genres: string;     
  tags: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
