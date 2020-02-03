export class Asset {
  asset: string;
  title: string;
  subtitle: string;
  cover_path: string;
  runtime: number;
  genres: string;
  tags: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  // cover_path throws lint error for variable name not being lowerCamelCase, PascalCase or UPPER_CASE.
  // However, this is neccesary since API returns the data in this format
}
