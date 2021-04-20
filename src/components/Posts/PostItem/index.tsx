import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { formatDate } from '../../../services/formatDate';
import styles from './styles.module.scss';

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
  post: Post;
}

export function PostItem({ post }: Props): JSX.Element {
  const formatedDate = formatDate(post.first_publication_date);
  return (
    <Link href={`/post/${post.uid}`}>
      <a className={styles.postItem}>
        <h2>{post.data.title}</h2>
        <p>{post.data.subtitle}</p>
        <div className={styles.postItem__info}>
          <FiCalendar />
          <span>{formatedDate}</span>
        </div>
        <div className={styles.postItem__info}>
          <FiUser />
          <span>{post.data.author}</span>
        </div>
      </a>
    </Link>
  );
}
