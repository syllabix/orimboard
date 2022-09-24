import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>orim | collaborate. simply.</title>
        <meta name="description" content="a lean mean collaboration app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="card w-96 bg-base-100 shadow-xl text-left p-4 border">
        <h1>orim</h1>
        <h3>collaborate. simply.</h3>
        <a href="/board/90210" className="btn mt-3">try it out</a>
      </div>

      <footer>

      </footer>
    </div>
  )
}

export default Home
