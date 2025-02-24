export const prerender = false;

import type { APIRoute } from "astro";
import { CustomerInquiry, db } from "astro:db";

export const POST: APIRoute = async ({request}) => {
 try{
    const data = await request.json();
    await db.insert(CustomerInquiry).values({
        property: data.title,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        submittedAt: new Date(),
    });
    return new Response(
      JSON.stringify({ message: "Form submitted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
 } catch (error) {
     return new Response(
      JSON.stringify({ message: "Error processing request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
 } 
}