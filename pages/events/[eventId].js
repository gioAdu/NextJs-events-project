import { Fragment, useContext, useEffect } from 'react'

import Comments from '../../components/input/comments'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/UI/error-alert'
import { dataFetcher } from '../../utils/dataFetcher'
import { getEventById, getFeaturedEvents } from '../../utils/dataFilter'
import { useRouter } from 'next/router'
import { headContext } from '../../store/headContext'

const SingleEvent = (props) => {
  const { setTitle } = useContext(headContext)
  const event = props.event
  const router = useRouter()

  useEffect(() => {
    if (event) {
      setTitle(event.title)
    } else if (router.isFallback) {
      setTitle('Loading ...')
    } else {
      setTitle('Event not found')
    }
  }, [event, router.isFallback])

  if (router.isFallback) {
    return (
      <ErrorAlert>
        <p>Loading ...</p>
      </ErrorAlert>
    )
  }

  if (!event) {
    return (
      <ErrorAlert>
        <p>Event not found.</p>
      </ErrorAlert>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  )
}

export default SingleEvent

export async function getStaticProps(context) {
  const event = await getEventById(context.params.eventId)

  return {
    props: {
      event: event || null,
    },
    revalidate: 1801,
  }
}

export async function getStaticPaths() {
  const data = await dataFetcher()
  const featuredEvents = getFeaturedEvents(data)
  const paths = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }))

  return {
    paths,
    fallback: true,
  }
}
