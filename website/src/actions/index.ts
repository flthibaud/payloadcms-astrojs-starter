import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { getPayload } from 'payload'
import { config } from 'payload-app'

export const server = {
  addPost: defineAction({
    input: z.object({
      title: z.string(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayload({ config })
      return payload.create({ collection: 'posts', data: input })
    },
  }),
  deletePost: defineAction({
    input: z.object({
      // UI stores ids as data attributes, coerce them back to numbers for Payload
      id: z.coerce.number(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayload({ config })
      return payload.delete({ collection: 'posts', id: input.id })
    },
  }),
}
