export class AssetMetadata {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  genres: string;
  cast: string;
  directors: string;
  year: number;
  country: string;
  runtime: number;
  age_rating: string;
  tags: string;
  streams: Object[];
  licensing: Object;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
