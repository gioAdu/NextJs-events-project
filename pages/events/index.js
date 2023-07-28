import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { getFilteredEvents } from '../../utils/dataFilter'
import ErrorAlert from '../../components/UI/error-alert'
import { dataFetcher } from '../../utils/dataFetcher'
import { headContext } from '../../store/headContext'

const EventsPage = (props) => {
  const [filteredEvents, setFilteredEvents] = useState()
  const router = useRouter()
  const params = useSearchParams()
  const year = params.get('year')
  const month = params.get('month')
  const { setTitle } = useContext(headContext)
  const events = props.events

  const searchHandler = (year, month) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, year: year, month: month },
    })
  }

  useEffect(() => {
    if (!year || !month) {
      setTitle('All Events')
      return setFilteredEvents(events)
    }

    setTitle('Filtered events')
    setFilteredEvents(
      getFilteredEvents(
        {
          year: +year,
          month: +month,
        },
        events
      )
    )
  }, [year, month, events])

  return (
    <Fragment>
      <EventsSearch onSearch={searchHandler} />
      {filteredEvents?.length === 0 && (
        <ErrorAlert>
          <p>no events found</p>
        </ErrorAlert>
      )}
      {filteredEvents && <EventList items={filteredEvents} />}
    </Fragment>
  )
}

export async function getStaticProps() {
  const data = await dataFetcher()

  return {
    props: {
      events: data,
    },
    revalidate: 60,
  }
}

export default EventsPage
