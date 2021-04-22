import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../services/formatDate';
import Header from '../../components/Header';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const formatedDate = formatDate(post.first_publication_date);
  const router = useRouter();
  if (router.isFallback) {
    return <div className="">Carregando...</div>;
  }
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
          <div className={styles.post__info}>
            <div className="">
              <FiCalendar />
              <span>{formatedDate}</span>
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
          {post.data.content.map(content => (
            <div className={styles.post__content} key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                className={styles.post__contentBody}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </div>
          ))}
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

  const post = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      title: response.data.title,
      subtitle: response.data.subtitle,
      content: response.data.content.map(item => {
        return {
          heading: item.heading,
          body: [...item.body],
        };
      }),
    },
  };
  return {
    props: {
      post,
    },
    revalidate: 60 * 60, // 1hora
  };
};
