import { PostItem } from '../PostItem';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props): JSX.Element {
  return (
    <div className="posts">
      {posts.map(post => (
        <PostItem post={post} key={post.uid} />
      ))}
    </div>
  );
}
