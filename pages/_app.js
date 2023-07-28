import Layout from '../components/layout/layout'
import '../styles/globals.css'
import { headContext } from '../store/headContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState('Home')
  const [description, setDescription] = useState('Check amazing events')

  return (
    <headContext.Provider
      value={{ title, setTitle, description, setDescription }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </headContext.Provider>
  )
}

export default MyApp
