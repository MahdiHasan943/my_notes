"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AllTask = () => {
  const [notes, setNotes] = useState([]);
  const [visibleNotes, setVisibleNotes] = useState(6); // Initial number of notes to display

  const fetchPosts = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // If successful, fetch notes again to update the list
      fetchPosts();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showAllNotes = () => {
    setVisibleNotes(notes.length); // Show all notes
  };

  return (
    <div className="py-8 px-4 sm:px-8">
      <h1 className="text-[#6D6DBB] text-center font-bold text-4xl leading-[60px]">
        My All Notes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-4">
        {notes
          .sort((a, b) => {
            const lastObject = notes[notes.length - 1];
            if (a === lastObject) return -1;
            if (b === lastObject) return 1;
            return 0;
          })
          .slice(0, visibleNotes)
          .map((note, index) => {
            const date = new Date(note.date);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return (
              <div
                key={note._id} // Ensure each note has a unique key
                className="relative bg-white hover:bg-yellow-50 duration-300 delay-100 ease-linear py-4 px-4 rounded-md shadow-lg border border-gray-100"
              >
                <h2 className="font-semibold">
                  <span className="text-[#6D6DBB] font-bold text-2xl">
                    {index + 1}
                  </span>
                  . {note.title}
                </h2>
                <div className="py-4 flex gap-12">
                  <p className="text-[15px] capitalize">
                    <span className="text-[#6D6DBB] font-semibold">
                      Subject:
                    </span>{" "}
                    {note.subject}
                  </p>
                  <p className="text-[15px]">
                    <span className="text-[#6D6DBB] font-semibold">Date:</span>{" "}
                    {formattedDate}
                  </p>
                </div>
                <p className="text-[15px] mb-20">
                  <span className="text-[#6D6DBB] font-semibold">
                    Description:
                  </span>{" "}
                  {note.description}
                </p>

                <div className="py-4  absolute bottom-0 left-0 w-full justify-center flex gap-12">
                  <Link href={`/EditNote/${note._id}`}>
                    <div className="py-2 flex items-center gap-4 px-4 bg-yellow-100 rounded-md text-[#111">
                      <Image
                        src="/edit-3-svgrepo-com.svg"
                        alt="edit"
                        width={25}
                        height={25}
                      />
                      <span>Edit</span>
                    </div>
                  </Link>

                  <div className="py-2  flex items-center gap-4 px-4 bg-yellow-100 rounded-md text-[#111">
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="text-red-500 flex items-center gap-4 hover:text-red-700"
                    >
                      <Image
                        src="/delete-button-svgrepo-com.svg"
                        alt="delete"
                        width={25}
                        height={25}
                      />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="text-center">
        <button
          onClick={showAllNotes}
          className={`mt-4 rounded-md ${
            visibleNotes < notes.length
              ? " py-3 px-10 bg-sky-400 rounded-md text-white"
              : "py-3 px-10 bg-sky-400 rounded-md text-white cursor-not-allowed"
          }`}
          disabled={visibleNotes >= notes.length}
        >
          See All
        </button>
      </div>
    </div>
  );
};

export default AllTask;
