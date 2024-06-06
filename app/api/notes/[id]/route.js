import connectDB from "@/back-end-utils/database";
import Note from "@/back-end-utils/models/Note";

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params; // Extract the ID from the params
    if (!id) {
      return new Response("Note ID is required", { status: 400 });
    }

    const deletedNote = await Note.findByIdAndRemove(id);
    if (!deletedNote) {
      return new Response("Note not found", { status: 404 });
    }

    return new Response("Note deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return new Response("Error deleting note", { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    await connectDB();

    const notes = await Note.find().exec();
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all notes", { status: 500 });
  }
};
