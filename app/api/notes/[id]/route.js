import connectDB from "@/back-end-utils/database";
import Note from "@/back-end-utils/models/Note";

export const PATCH = async (request, { params }) => {
  const { title, subject, date, description } = await request.json();

  try {
    await connectDB();

    // Find the existing note by ID
    const existingNote = await Note.findById(params.id);

    if (!existingNote) {
      return new Response("Note not found", { status: 404 });
    }

    // Update the note with new data
    existingNote.title = title;
    existingNote.subject = subject;
    existingNote.date = date;
    existingNote.description = description;

    await existingNote.save();

    return new Response("Successfully updated the note", { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return new Response("Error updating note", { status: 500 });
  }
};
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const note = await Note.findById(params.id);
    if (!note) return new Response("Note Not Found", { status: 404 });

    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    console.error(error); // Logging the error for debugging
    return new Response("Internal Server Error", { status: 500 });
  }
};
