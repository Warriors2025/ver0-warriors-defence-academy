/**
 * Optional post-payment notifications (WhatsApp / SMS).
 * No-ops when provider env vars are not configured.
 */

import { confirmationText, type ReceiptShareParams } from "@/lib/registration-receipt"

type NotifyParams = ReceiptShareParams

function digitsPhone(phone: string) {
  const d = phone.replace(/\D/g, "")
  if (d.length === 10) return `91${d}`
  if (d.startsWith("91") && d.length === 12) return d
  return d
}

async function sendWhatsAppCloud(p: NotifyParams) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !phoneNumberId) return { skipped: true as const }

  const to = digitsPhone(p.phone)
  if (!to) return { ok: false as const, error: "Invalid phone" }

  const template = process.env.WHATSAPP_TEMPLATE_NAME
  const body = template
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: p.name },
                { type: "text", text: p.receiptNo },
                { type: "text", text: p.registrationId },
                { type: "text", text: `₹${p.amount.toFixed(2)}` },
              ],
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: confirmationText(p) },
      }

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("WhatsApp notify failed:", err)
    return { ok: false as const, error: err }
  }
  return { ok: true as const }
}

async function sendMsg91Sms(p: NotifyParams) {
  const authKey = process.env.MSG91_AUTH_KEY
  const templateId = process.env.MSG91_TEMPLATE_ID
  const sender = process.env.MSG91_SENDER_ID || "WDAACA"
  if (!authKey) return { skipped: true as const }

  const mobile = digitsPhone(p.phone)
  if (!mobile) return { ok: false as const, error: "Invalid phone" }

  if (templateId) {
    const res = await fetch("https://control.msg91.com/api/v5/flow/", {
      method: "POST",
      headers: {
        authkey: authKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id: templateId,
        short_url: "0",
        recipients: [
          {
            mobiles: mobile,
            name: p.name,
            receipt: p.receiptNo,
            regid: p.registrationId,
            amount: String(p.amount),
          },
        ],
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error("MSG91 flow SMS failed:", err)
      return { ok: false as const, error: err }
    }
    return { ok: true as const }
  }

  const message = `WDA: Seat confirmed. Receipt ${p.receiptNo}. Reg ${p.registrationId}. Paid Rs ${p.amount}. Call 7081011964`
  const res = await fetch("https://api.msg91.com/api/v2/sendsms", {
    method: "POST",
    headers: {
      authkey: authKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender,
      route: "4",
      country: "91",
      sms: [{ message, to: [mobile.replace(/^91/, "")] }],
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error("MSG91 SMS failed:", err)
    return { ok: false as const, error: err }
  }
  return { ok: true as const }
}

/** Fire-and-forget friendly: never throws to the payment path. */
export async function notifyRegistrationPaid(params: NotifyParams) {
  try {
    const [wa, sms] = await Promise.all([
      sendWhatsAppCloud(params).catch((e) => {
        console.error("WhatsApp notify error:", e)
        return { ok: false as const, error: String(e) }
      }),
      sendMsg91Sms(params).catch((e) => {
        console.error("SMS notify error:", e)
        return { ok: false as const, error: String(e) }
      }),
    ])
    return { whatsapp: wa, sms }
  } catch (error) {
    console.error("notifyRegistrationPaid error:", error)
    return { whatsapp: { ok: false as const }, sms: { ok: false as const } }
  }
}
