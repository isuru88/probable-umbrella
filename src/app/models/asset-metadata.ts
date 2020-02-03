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
  streams: object[];
  licensing: object;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  // age_rating throws lint error for variable name not being lowerCamelCase, PascalCase or UPPER_CASE.
  // However, this is neccesary since API returns the data in this format
}
