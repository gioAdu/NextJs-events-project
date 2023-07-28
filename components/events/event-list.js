import EventItem from './event-item'
import styles from './event-list.module.css'
const EventList = (props) => {
  return (
    <ul className={styles.list}>
      {props.items.map((item) => (
        <EventItem
          key={item.id}
          title={item.title}
          date={item.date}
          location={item.location}
          id={item.id}
          image={item.image}
        />
      ))}
    </ul>
  )
}

export default EventList
