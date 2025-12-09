import { type NextRequest, NextResponse } from "next/server"

interface ConsultationData {
  fullName: string
  email: string
  mobile: string
  city: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationData = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.mobile || !data.city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Store in database or send email notification
    console.log("New consultation request:", data)

    // TODO: Integrate with database or email service
    // Example: await saveToDatabase(data)
    // Example: await sendEmailNotification(data)

    return NextResponse.json(
      {
        message: "Consultation request received",
        data: {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing consultation request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
