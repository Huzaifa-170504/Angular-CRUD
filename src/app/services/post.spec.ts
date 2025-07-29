import { Post } from '../models/post';

describe('Post interface', () => {
  it('should accept valid post object', () => {
    const post: Post = {
      title: 'Test Title',
      content: 'Test Content'
    };
    expect(post.title).toBe('Test Title');
  });
});
