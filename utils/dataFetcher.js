export async function dataFetcher() {
  const response = await fetch(
    `https://nextjs-course-686e7-default-rtdb.europe-west1.firebasedatabase.app/events/.json`
  )

  const data = await response.json()

  const transformedData = []
  for (const key in data) {
    transformedData.push({
      id: key,
      ...data[key],
    })
  }
  return transformedData
}
