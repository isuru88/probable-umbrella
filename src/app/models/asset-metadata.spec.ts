import { AssetMetadata } from './asset-metadata';

describe('AssetMetadata', () => {
  it('should create an instance', () => {
    expect(new AssetMetadata()).toBeTruthy();
  });

  it('should instantiate with the given data', () => {
    const testObject = { testKey: 'testValue' };

    const asset = new AssetMetadata({
      id: 'testAsset',
      title: 'testTitle',
      subtitle: 'testSubtitle',
      description: 'testDescription',
      genres: 'testGenre',
      cast: 'testCast',
      directors: 'testDirectors',
      year: 1970,
      country: 'testCountry',
      runtime: 1,
      age_rating: 'testRating',
      tags: 'testTags',
      streams: [testObject],
      licensing: testObject,
    });

    expect(asset.id).toBe('testAsset');
    expect(asset.title).toBe('testTitle');
    expect(asset.subtitle).toBe('testSubtitle');
    expect(asset.description).toBe('testDescription');
    expect(asset.genres).toBe('testGenre');
    expect(asset.cast).toBe('testCast');
    expect(asset.directors).toBe('testDirectors');
    expect(asset.year).toBe(1970);
    expect(asset.country).toBe('testCountry');
    expect(asset.runtime).toBe(1);
    expect(asset.age_rating).toBe('testRating');
    expect(asset.tags).toBe('testTags');
    expect(asset.streams).toEqual([testObject]);
    expect(asset.licensing).toEqual(testObject);
  });
});
