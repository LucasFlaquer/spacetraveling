import Link from 'next/link';
import styles from './styles.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface Props {
  post: Post;
}

export function PostItem({ post }: Props): JSX.Element {
  return (
    <Link href={`post/${post.uid}`}>
      <a className={styles.postItem}>
        <h2>{post.data.title}</h2>
        <p>{post.data.subtitle}</p>
        <div className={styles.post__info}>
          <img src="/images/calendar.svg" alt="calendar" />
          <span>{post.first_publication_date}</span>
        </div>
        <div className={styles.post__info}>
          <img src="/images/user.svg" alt="author" />
          <span>{post.data.author}</span>
        </div>
      </a>
    </Link>
  );
}
