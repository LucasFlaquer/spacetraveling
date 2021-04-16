import styles from './styles.module.scss';

interface Post {
  title: string;
  description: string;
  updated_at: string;
  author: string;
  slug: string;
}

interface Props {
  post: Post;
}

export function PostItem({ post }: Props): JSX.Element {
  return (
    <a href="/sss" className={styles.post}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className={styles.post__info}>
        <img src="/images/calendar.svg" alt="calendar" />
        <span>{post.updated_at}</span>
      </div>
      <div className={styles.post__info}>
        <img src="/images/user.svg" alt="author" />
        <span>{post.author}</span>
      </div>
    </a>
  );
}
