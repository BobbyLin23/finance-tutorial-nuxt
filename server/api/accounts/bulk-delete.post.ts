import { and, eq, inArray } from 'drizzle-orm'
import { getAuth } from 'h3-clerk'

import { accounts } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event)
  const body = await readBody(event)
  const { ids } = body

  if (!userId) {
    setResponseStatus(event, 401)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const res = await db
    .delete(accounts)
    .where(
      and(eq(accounts.user_id, userId), inArray(accounts.id, ids)),
    )
    .returning({
      id: accounts.id,
    })

  const data = {
    toJSON() {
      return res
    },
  }

  return data
})
