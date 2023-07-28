import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster_name}.eitkfgs.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const commentsById = async (req, res) => {
  if (req.method === 'POST') {
    await handlePostRequest(req, res)
  } else if (req.method === 'GET') {
    await handleGetRequest(req, res)
  }
}

const handlePostRequest = async (req, res) => {
  const eventId = req.query.eventId
  const comment = {
    commentId: (Math.random() * 10).toString(),
    name: req.body.name,
    text: req.body.text,
    email: req.body.email,
  }

  if (
    comment.email.trim() === '' ||
    !comment.email.includes('@') ||
    comment.name.trim() === '' ||
    comment.text.trim() === ''
  ) {
    res.status(422).json({ message: 'invalid values' })
    return
  }

  const newPostComments = {
    id: eventId,
    comments: [
      {
        ...comment,
      },
    ],
  }

  await client.connect()

  const db = client.db()

  // store the newPostComments object in a MongoDB collection,
  // and update the comments array of an existing document with
  //the same id instead of adding a new document

  try {
    await db.collection('comments').updateOne(
      { id: newPostComments.id },
      {
        $push: {
          comments: { $each: newPostComments.comments, $position: 0 },
        },
      },
      { upsert: true }
    )
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' })
  }

  //fetch all the comments for the post
  try {
    const updatedDocument = await db
      .collection('comments')
      .findOne({ id: eventId })

    if (updatedDocument) {
      res.status(200).json({ comments: updatedDocument.comments })
    } else {
      res.status(500).json({ error: 'No comments found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' })
  }
  client.close()
}

const handleGetRequest = async (req, res) => {
  const eventId = req.query.eventId

  await client.connect()

  const db = client.db()

  try {
    const updatedDocument = await db
      .collection('comments')
      .findOne({ id: eventId })

    if (updatedDocument) {
      res.status(200).json({ comments: updatedDocument.comments })
    } else {
      res.status(200).json({ comments: null })
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' })
  }
}

export default commentsById
