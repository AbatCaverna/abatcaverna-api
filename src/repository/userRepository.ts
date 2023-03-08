import User from '../models/users'
import getDatabase from '../util/database'

const UserRespository = {
  async getUserByEmail(email: string): Promise<User> {
    try {
      const _database = await getDatabase()
      const [user] = (await _database.collection('users')
        .find({ email })
        .toArray()) as User[]
      return user
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
  },

  async createUser(name?: string, email?: string, image?: string, stripe_customer_id?: string): Promise<User> {
    try {
      const newUser = new User(stripe_customer_id, name, email, image)
      const _database = await getDatabase()
      await _database
        .collection('users')
        .insertOne(newUser)

      return newUser
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
  }
}

export default UserRespository
