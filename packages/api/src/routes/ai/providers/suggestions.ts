import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { QBUser as TQBUser } from 'quickblox'

import { getChatCompletion } from '@/services/openai'
import { qbGetUsersByTags } from '@/services/users'
import { parseUserCustomData } from '@/utils/user'
import { QBUser } from '@/models'

export const suggestProviderSchema = {
  tags: ['ai'],
  description: 'Get suggested providers by name or issue',
  body: Type.Object({
    topic: Type.String(),
  }),
  response: {
    200: Type.Object({
      providers: Type.Array(Type.Ref(QBUser)),
    }),
  },
  security: [
    { apiKey: [] },
    { providerSession: [] },
    { clientSession: [] },
  ] as Array<{
    [securityLabel: string]: string[]
  }>,
}

const getAllProviders = async (page = 1): Promise<Dictionary<TQBUser>> => {
  const PER_PAGE = 100
  const { total_entries, items } = await qbGetUsersByTags('provider', {
    per_page: PER_PAGE,
    page,
  })

  const providersDictionary = items.reduce<Dictionary<TQBUser>>(
    (res, { user }) => ({ ...res, [user.id]: user }),
    {},
  )

  if (total_entries > page * PER_PAGE) {
    const providersDictionaryLast = await getAllProviders(page + 1)

    return { ...providersDictionary, ...providersDictionaryLast }
  }

  return providersDictionary
}

const getProvidersKeywords = (providrs: Dictionary<TQBUser>) => {
  const providersList = Object.values(providrs)
  const keywordsList = providersList.reduce((res, user) => {
    const { keywords } = parseUserCustomData(user.custom_data)

    return keywords ? `${res}\n${user.id}: ${keywords}` : res
  }, '')

  return keywordsList.trim()
}

const suggestProvider: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    '/suggestions',
    {
      schema: suggestProviderSchema,
      onRequest: fastify.verify(fastify.BearerToken, fastify.SessionToken),
    },
    async (request) => {
      const { topic } = request.body

      const users = await getAllProviders()
      const usersByFullName = Object.values(users).filter(({ full_name }) =>
        full_name?.toLowerCase().includes(topic.toLowerCase()),
      )

      if (usersByFullName.length) {
        return { providers: usersByFullName }
      }

      const usersKeywords = getProvidersKeywords(users)

      const res = await getChatCompletion(
        [
          {
            role: 'system',
            content:
              'You are a receptionist. You have a list of consultants in the format: "id: keywords"\n' +
              `${usersKeywords}\n` +
              'Keywords describe the consultant. User input issue. Select consultants for the user. If there are no suitable consultants, do not display all.',
          },
          { role: 'user', content: topic },
          {
            role: 'user',
            content:
              'Display only list of the id of suitable consultants without explanation of reasons.',
          },
        ],
        {
          temperature: 0,
          top_p: 1,
        },
      )

      const providerIds: string[] | null = res.match(/\d+/g)

      const providers = providerIds?.map((id) => users[id]) || []

      return {
        providers,
      }
    },
  )
}

export const autoload = JSON.parse<boolean>(process.env.AI_SUGGEST_PROVIDER!)

export default suggestProvider