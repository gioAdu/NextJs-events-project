import styles from './event-item.module.css'
import Button from '../UI/Button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import Image from 'next/image'

const EventItem = ({ title, image, date, location, id }) => {
  const dateString = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`

  return (
    <li className={styles.item}>
      <Image
        src={'/' + image}
        alt={title}
        width={0}
        height={0}
        sizes='100vw'
        priority
      />
      <div className={styles.content}>
        <div className={styles.summary}>
          <div>
            <h2>{title}</h2>
          </div>
          <div className={styles.date}>
            <DateIcon />
            <time>{dateString}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem
