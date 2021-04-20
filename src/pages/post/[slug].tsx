import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../services/formatDate';
import Header from '../../components/Header';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    // content: {
    //   heading: string;
    //   body: {
    //     text: string;
    //   }[];
    // }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <>
      <Head>
        <title>spacetraveling | {post.data.title}</title>
      </Head>
      <Header />
      <div className={styles.post}>
        <figure>
          <img src={post.data.banner.url} alt={post.data.title} />
        </figure>
        <main>
          <h1 className={styles.post__title}>{post.data.title}</h1>
          <div className="">
            <div className="">
              <FiCalendar />
              <span>{post.first_publication_date}</span>
            </div>
            <div className="">
              <FiUser />
              <span>{post.data.author}</span>
            </div>
            <div className="">
              <FiClock />
              <span>4 min</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.slug'],
    }
  );
  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});
  const formatedDate = formatDate(response.first_publication_date);
  const post: Post = {
    first_publication_date: formatedDate,
    data: {
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      title: response.data.title,
      // content: [{ body: { : '' }, heading: '' }],
    },
  };
  return {
    props: {
      post,
    },
  };
};
