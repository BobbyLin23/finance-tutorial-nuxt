import { and, eq } from 'drizzle-orm'
import { getAuth } from 'h3-clerk'

import { accounts } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event)

  const query = getQuery(event)
  const params = getRouterParams(event)

  const id = query.id as string

  console.log('id', id, params, query)

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
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts)
    .where(and(eq(accounts.user_id, userId), eq(accounts.id, id)))

  if (!data) {
    setResponseStatus(event, 404)
    throw createError({
      statusCode: 404,
      statusMessage: 'Account not found',
    })
  }

  console.log('res', data)

  const res = {
    toJSON() {
      return data
    },
  }

  return res
})
