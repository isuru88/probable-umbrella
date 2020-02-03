import { Category } from './category';
import { Asset } from './asset';

describe('Category', () => {
  it('should create an instance', () => {
    expect(new Category()).toBeTruthy();
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

    const category = new Category({
      name: 'testName',
      assets: [asset]
    });

    expect(category.name).toBe('testName');
    expect(category.assets).toEqual([asset]);
  });
});
