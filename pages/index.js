import { useContext, useEffect } from 'react'
import EventList from '../components/events/event-list'
import { dataFetcher } from '../utils/dataFetcher'
import { getFeaturedEvents } from '../utils/dataFilter'
import { headContext } from '../store/headContext'
import NewsLetterRegistration from '../components/input/newsletter-registration'
const HomePage = (props) => {
  const featuredEvents = getFeaturedEvents(props.events)
  const { setTitle } = useContext(headContext)

  useEffect(() => {
    setTitle(' Featured Events')
  }, [])

  return (
    <div>
      <NewsLetterRegistration />
      <EventList items={featuredEvents} />
    </div>
  )
}

export async function getStaticProps() {
  const data = await dataFetcher()

  return {
    props: {
      events: data,
    },
    revalidate: 1800,
  }
}

export default HomePage
