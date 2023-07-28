import { useEffect, useRef, useState } from 'react'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
  const emailInputRef = useRef()
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState()
  const [successMsg, setSuccessMsg] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (error) {
      var timerId = setTimeout(() => setError(null), 6000)
    }

    if (successMsg) {
      var successTimer = setTimeout(() => setSuccessMsg(null), 7000)
    }

    return () => {
      clearTimeout(timerId)
      clearTimeout(successTimer)
    }
  }, [error, successMsg])

  async function registrationHandler(event) {
    event.preventDefault()

    let emailValue = emailInputRef.current.value

    if (!emailValue.trim() || !emailValue.includes('@')) {
      setIsValid(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await subscribeToNewsletter(emailValue)
      setSuccessMsg(response.message)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
    emailInputRef.current.value = ''
    setIsValid(true)
  }

  async function subscribeToNewsletter(email) {
    const response = await fetch('/api/signupApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.message)
    }

    return response.json()
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button disabled={isLoading}>Register</button>
        </div>
        {successMsg && <span className={classes.successMsg}>{successMsg}</span>}
        {(!isValid || error) && !successMsg && (
          <span style={{ color: 'red' }}>
            {error || 'Please write a correct email'}
          </span>
        )}
      </form>
    </section>
  )
}

export default NewsletterRegistration
