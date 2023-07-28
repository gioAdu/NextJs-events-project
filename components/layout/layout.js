import { Fragment, useContext } from 'react'
import MainHeader from './main-header'
import Head from 'next/head'
import { headContext } from '../../store/headContext'

const Layout = (props) => {
  const { title, description } = useContext(headContext)
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
