import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { useState } from 'react';

import { PostList } from '../components/Posts/PostList';
import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { formatDate } from '../services/formatDate';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}
interface dataResponse {
  next_page: string | null;
  results: Post[];
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState<string | null>(
    postsPagination.next_page
  );

  function FetchMorePosts(): void {
    const url = postsPagination.next_page;
    fetch(url)
      .then(response => response.json())
      .then((data: dataResponse) => {
        setNextPage(data.next_page);
        setPosts([...posts, ...data.results]);
      });
  }

  return (
    <>
      <Head>
        <title>spacetraveling</title>
      </Head>
      <Header />
      <main>
        <PostList posts={posts} />
        {nextPage && (
          <button
            className={styles.loadMore}
            type="button"
            onClick={FetchMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 2,
    }
  );

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: post.data,
    };
  });
  const postsPagination = {
    next_page: response.next_page,
    results: posts,
  };

  return {
    props: { postsPagination },
  };
};
