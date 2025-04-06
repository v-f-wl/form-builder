import { UserJSON, WebhookEvent, EmailAddress } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { headers } from "next/headers"
import { db } from '@/db'
import { usersTable } from '@/db/schema'

interface ExtendedUserJSON extends UserJSON {
  mail_addresses: EmailAddress[];
  first_name: string | null;
  last_name: string | null;
}

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  const wh = new Webhook(SIGNING_SECRET)

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400, // todo: обрадатывать ошибку
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    return new Response('Error: Verification error', {
      status: 400,// todo: обрадатывать ошибку
    })
  }
  const user = evt.data as ExtendedUserJSON
  if (evt.type === 'user.created') {
    const email = user.email_addresses?.[0]?.email_address
    const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim()
    const clerkId = user.id

    try {
      await db.insert(usersTable).values({
        name,
        email,
        clerkId,
      })
    } catch (err) {
      return new Response('DB error', { status: 500 }) // todo: обрадатывать ошибку
    }
  }

  return new Response('Webhook received', { status: 200 })
}