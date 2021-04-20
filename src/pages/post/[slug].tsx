import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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
      <div className={styles.post}>
        <figure>
          <img src={post.data.banner.url} alt={post.data.title} />
        </figure>
        <main>
          <h1 className={styles.post__title}>{post.data.title}</h1>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);
  return {
    paths: [{ params: { slug: 'como-ser-mais-produtivo' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});
  console.log(response);
  const post: Post = {
    first_publication_date: response.first_publication_date,
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
