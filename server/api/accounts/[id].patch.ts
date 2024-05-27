import { and, eq } from 'drizzle-orm'
import { getAuth } from 'h3-clerk'
import { accounts } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event)

  const params = getRouterParam(event, 'id')
  const query = getQuery(event)
  const id = query.id as string
  const values = await readBody(event)

  console.log('query', query, 'values', values, 'params', params)

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
    .update(accounts)
    .set(values)
    .where(and(eq(accounts.user_id, userId), eq(accounts.id, id)))
    .returning()

  const res = {
    toJSON() {
      return data
    },
  }

  return res
})
