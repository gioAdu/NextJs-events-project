import Link from 'next/link'
import styles from './main-header.module.css'

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>Home page</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href='/events'>Browse ALL Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
