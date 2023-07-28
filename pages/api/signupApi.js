import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster_name}.eitkfgs.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const signupApi = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail.trim() || !userEmail.includes('@')) {
      res.status(422).json({ message: 'invalid email address' })
      return
    }

    try {
      await client.connect()

      const db = client.db()

      //Add new email if this email doesn't exist else retur0n
      const result = await db
        .collection('email')
        .updateOne(
          { email: userEmail },
          { $set: { email: userEmail } },
          { upsert: true }
        )

      client.close()

      if (result.upsertedId) {
        res.status(200).json({
          message:
            'You have successfully subscribed to our newsletter. Thank you for your interest',
        })
      } else {
        res.status(409).json({ message: 'Email already registered' })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'An error occurred' })
    }
  }
}

export default signupApi
