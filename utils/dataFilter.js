import { dataFetcher } from './dataFetcher'

export function getFeaturedEvents(events) {
  return events.filter((event) => event.isFeatured)
}

export function getFilteredEvents(dateFilter, events) {
  const { year, month } = dateFilter

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export async function getEventById(id) {
  const data = await dataFetcher()

  return data.find((event) => event.id === id)
}
