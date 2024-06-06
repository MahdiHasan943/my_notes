"use client";
import React, { useEffect, useState } from "react";

const AllTask = () => {
  const [notes, setNotes] = useState([]);
  const [visibleNotes, setVisibleNotes] = useState(6); // Initial number of notes to display

  const fetchPosts = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
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
        {notes.slice(0, visibleNotes).map((note, index) => {
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
                  <span className="text-[#6D6DBB] font-semibold">Subject:</span>{" "}
                  {note.subject}
                </p>
                <p className="text-[15px]">
                  <span className="text-[#6D6DBB] font-semibold">Date:</span>{" "}
                  {formattedDate}
                </p>
              </div>
              <p className="text-[15px]">
                <span className="text-[#6D6DBB] font-semibold">
                  Description:
                </span>{" "}
                {note.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <button
          onClick={showAllNotes}
          className={`mt-4 py-2 px-4 rounded-md ${
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
