import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Google Docs 1.0</title>
        <link rel="icon" href="/docs.png" />
      </Head>
      <Header/>

    </div>
  )
}
