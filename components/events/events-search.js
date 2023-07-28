import { useRef } from 'react'
import Button from '../UI/Button'
import styles from './events-search.module.css'

const EventsSearch = (props) => {
  const yearRef = useRef()
  const monthRef = useRef()
  const submitHandler = (event) => {
    event.preventDefault()

    const selectedYear = yearRef.current.value
    const selectedMonth = monthRef.current.value

    props.onSearch(selectedYear, selectedMonth)
  }

  return (
    <form className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor='year'>Year</label>
          <select id='year' ref={yearRef}>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor='Month'>Month</label>
          <select id='Month' ref={monthRef}>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='8'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>
      </div>
      <Button onClick={submitHandler}>Find Events</Button>
    </form>
  )
}

export default EventsSearch
