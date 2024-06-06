"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EditForm = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    // Fetch existing note data
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${noteId}`);
        const data = await response.json();

        if (response.ok) {
          setForm({
            title: data.title,
            subject: data.subject,
            date: data.date.split("T")[0], // Format date as yyyy-mm-dd
            description: data.description,
          });
        } else {
          toast.error("Failed to fetch note data");
        }
      } catch (error) {
        console.error("Error fetching note data:", error);
        toast.error("An error occurred while fetching note data");
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("Note updated successfully");
      } else {
        toast.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("An error occurred while updating the note");
    }
  };

  return (
    <div className="px-4 py-8 sm:px-8">
      <div className="">
        <h1 className="text-[#6D6DBB] text-center font-bold text-4xl leading-[60px]">
          Update Note
        </h1>
        <div className="grid grid-cols-1 items-center sm:grid-cols-2 gap-4 py-4">
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="max-w-[450px] border border-[#6D6DBB] rounded-md p-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="py-3 px-4 mb-4 rounded-md text-[#111] border border-gray-400 w-full"
                value={form.title}
                onChange={handleChange}
              />

              <select
                name="subject"
                className="py-3 px-4 mb-4 rounded-md text-[#111] border border-gray-400 w-full"
                value={form.subject}
                onChange={handleChange}
              >
                <option value="">Select Subject</option>
                <option value="english">English</option>
                <option value="math">Math</option>
                <option value="physics">Physics</option>
                <option value="biology">Biology</option>
              </select>

              <input
                type="date"
                name="date"
                className="py-3 px-4 mb-4 rounded-md text-[#111] border border-gray-400 w-full"
                value={form.date}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                className="py-3 px-4 mb-4 rounded-md text-[#111] border border-gray-400 w-full"
                rows="4"
                value={form.description}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="py-3 px-4 bg-[#6D6DBB] text-white rounded-md w-full"
              >
                Update
              </button>
            </form>
          </div>
          <Image
            src="/note1.png"
            alt="note"
            width={600}
            height={600}
            className=""
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EditForm;
