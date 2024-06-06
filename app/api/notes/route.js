import connectDB from "@/back-end-utils/database";
import Note from "@/back-end-utils/models/Note";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();

    const newNote = new Note({
      title: body.title,
      subject: body.subject,
      date: body.date,
      description: body.description,
    });

    const savedNote = await newNote.save();

    return new Response(JSON.stringify(savedNote), { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return new Response("Failed to create note", { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    await connectDB();

    const works = await Note.find().exec();
    console.log(works);
    return new Response(JSON.stringify(works), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all works", { status: 500 });
  }
};

export const DELETE = async (request) => {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "note deletes" }, { status: 200 });
};
// export const PATCH = async (request, { params }) => {
//   const { prompt, tag } = await request.json();

//   try {
//     await connectDB();

//     // Find the existing prompt by ID
//     const existingPrompt = await Prompt.findById(params.id);

//     if (!existingPrompt) {
//       return new Response("Prompt not found", { status: 404 });
//     }

//     // Update the prompt with new data
//     existingPrompt.prompt = prompt;
//     existingPrompt.tag = tag;

//     await existingPrompt.save();

//     return new Response("Successfully updated the Prompts", { status: 200 });
//   } catch (error) {
//     return new Response("Error Updating Prompt", { status: 500 });
//   }
// };
