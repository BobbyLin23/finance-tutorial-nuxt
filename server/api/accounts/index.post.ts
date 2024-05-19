import { createId } from '@paralleldrive/cuid2'
import { getAuth } from 'h3-clerk'
import { accounts } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event)

  const values = await readBody(event)

  if (!userId) {
    setResponseStatus(event, 401)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const [data] = await db
    .insert(accounts)
    .values({
      id: createId(),
      user_id: userId,
      ...values,
    })
    .returning()

  return JSON.parse(JSON.stringify(data))
})
