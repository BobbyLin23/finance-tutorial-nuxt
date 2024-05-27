import { and, eq } from 'drizzle-orm'
import { getAuth } from 'h3-clerk'
import { accounts } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event)

  const id = getRouterParam(event, 'id')

  if (!userId) {
    setResponseStatus(event, 401)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!id) {
    setResponseStatus(event, 400)
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid id',
    })
  }

  const [data] = await db
    .delete(accounts)
    .where(and(eq(accounts.user_id, userId), eq(accounts.id, id)))
    .returning({
      id: accounts.id,
    })

  const res = {
    toJSON() {
      return data
    },
  }

  return res
})
