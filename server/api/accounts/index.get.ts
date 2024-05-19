import { eq } from 'drizzle-orm'
import { getAuth } from 'h3-clerk'

import { accounts } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    setResponseStatus(event, 401)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const [data] = await db.select({
    id: accounts.id,
    name: accounts.name,
  }).from(accounts).where(eq(accounts.user_id, userId))

  return data
})
