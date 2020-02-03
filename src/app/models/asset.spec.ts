import { Asset } from './asset';

describe('Asset', () => {
  it('should create an instance', () => {
    expect(new Asset()).toBeTruthy();
  });

  it('should instantiate with the given data', () => {
    const asset = new Asset({
      asset: 'testAsset',
      title: 'testTitle',
      subtitle: 'testSubtitle',
      cover_path: 'testCoverPath',
      runtime: 1,
      genres: 'testGenre',
      tags: 'testTags'
    });

    expect(asset.asset).toBe('testAsset');
    expect(asset.title).toBe('testTitle');
    expect(asset.subtitle).toBe('testSubtitle');
    expect(asset.cover_path).toBe('testCoverPath');
    expect(asset.runtime).toBe(1);
    expect(asset.genres).toBe('testGenre');
    expect(asset.tags).toBe('testTags');
  });
});
