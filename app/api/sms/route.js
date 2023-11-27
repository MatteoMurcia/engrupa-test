import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = 'AC3b5b0c8f2bc09c93d2bbf45fa7c6d82f';
const authToken = '7d63dce7926d5c6f8e7d28db8545bf4f';
const client = twilio(accountSid, authToken);

export async function POST(request) {
  try {
    const data = await request.json();
    const message = await client.messages.create({
      body: data.message,
      // from: "whatsapp:+14252797504",
      // to: `whatsapp:${data.phone}`
      from: "+12674330573",
      to: data.phone,
    });
    console.log(message.sid);

    return NextResponse.json(
      { message: "Message sent" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error sending message",
      },
      {
        status: 500,
      }
    );
  }
}