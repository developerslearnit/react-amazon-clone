import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon Clone</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='Amazon clone made with Next.js' />
        <meta name='keywords' content='amazon, clone, next.js, javascript' />
        <meta name='author' content='Adesina Mark Omoniyi' />
        <meta name='copyright' content='Adesina Mark Omoniyi' />
      </Head>
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products: products,
      session,
    }
  }
}
