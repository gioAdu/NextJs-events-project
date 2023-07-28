import EventList from './event-list'
import { Fragment } from 'react'
import ErrorAlert from '../UI/error-alert'
import { getFilteredEvents } from '../../utils/dummy-data'

const FilteredEventsPage = ({ year, month }) => {
  const FilteredEvents = getFilteredEvents({
    year: +year,
    month: +month,
  })

  if (!FilteredEvents || FilteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events Found</p>
        </ErrorAlert>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <EventList items={FilteredEvents} />
    </Fragment>
  )
}

export default FilteredEventsPage
