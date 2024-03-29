import { z } from 'zod'

import UserRespository from '../repository/userRepository'
import getStripe from '../providers/stripe'
import schedule from '../providers/job/scheduler'

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().optional(),
  role: z.string()
})

type User = z.infer<typeof UserSchema>

const UserService = {
  async createUserIfNotInDB(user: User) {
    if(!UserSchema.parse(user)) throw new Error('Missing data')

    try {
      const userFound = await UserRespository.getUserByEmail(user.email)

      if (!userFound) {
        const stripe = getStripe()
        
        const stripe_customer = await stripe.customers.create({
          email: user.email
        })

        const newUser = await UserRespository.createUser(user.name, user.email, user.image, stripe_customer.id)
        console.log('[SERVER]: Created user in stripe', stripe_customer)
        await schedule.newUser(user.email, user.name)

        return newUser
      }

      return userFound
    } catch (error) {
      throw new Error(`Something wrong, ${error}`)      
    }
  }
}

export default UserService
