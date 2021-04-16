import { PostItem } from '../PostItem';

export function PostList(): JSX.Element {
  const post = {
    title: 'lorem5',
    description: 'Lorem, ipsit amet consectetur adit. Molestiae, doloremque!',
    updated_at: '15 Mar 2021',
    slug: 'hah-adhf-asdf0',
    author: 'LucasFlaquer',
  };
  return (
    <div className="posts">
      <PostItem post={post} />
      <PostItem post={post} />
      <PostItem post={post} />
      <PostItem post={post} />
      <PostItem post={post} />
      <PostItem post={post} />
    </div>
  );
}
