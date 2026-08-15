import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON payload from the frontend
    const body = await request.json();
    const { name, phone, email, requirement } = body;

    // 1. Basic Server-Side Validation
    if (!name || !phone || !requirement) {
      return NextResponse.json(
        { error: "Name, phone number, and requirements are mandatory." },
        { status: 400 }
      );
    }

    // 2. Log the incoming request to the server console (Useful for debugging)
    console.log("=========================================");
    console.log("⚡ NEW QUOTE ENQUIRY RECEIVED ⚡");
    console.log("=========================================");
    console.log(`Name        : ${name}`);
    console.log(`Phone       : ${phone}`);
    console.log(`Email       : ${email || "Not Provided"}`);
    console.log(`Requirement : \n${requirement}`);
    console.log("=========================================\n");

    // 3. Simulate processing time (Allows your UI button to show "Sending...")
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 4. TODO: Integrate Real Email/SMS Service Here
    // Example: await resend.emails.send({ from: '...', to: '...', subject: 'New Quote', html: '...' });

    // 5. Return success response to the client
    return NextResponse.json(
      { message: "Enquiry successfully routed to Geco Grinding Centre." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Quote API Error:", error);
    
    // Return a generic 500 error if something crashes
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}