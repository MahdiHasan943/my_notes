import connectDB from "@/back-end-utils/database";
import Note from "@/back-end-utils/models/Note";

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
