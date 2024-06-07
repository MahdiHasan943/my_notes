"use client";
import Image from "next/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    date: "",
    description: "",
  });

  const [isOtherSubject, setIsOtherSubject] = useState(false);
  const [otherSubject, setOtherSubject] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "subject" && value === "other") {
      setIsOtherSubject(true);
    } else {
      if (name === "subject") {
        setIsOtherSubject(false);
      }
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleOtherSubjectChange = (e) => {
    setOtherSubject(e.target.value);
    setForm({
      ...form,
      subject: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Note created successfully:", data);
        // Reset form or handle success state
        setForm({ title: "", subject: "", date: "", description: "" });
        setIsOtherSubject(false);
        setOtherSubject("");
        toast.success("Successfully created Note!");
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="px-4 py-8 sm:px-8">
      <div className="">
        <h1 className="text-[#6D6DBB] text-center font-bold text-4xl leading-[60px]">
          Create A Note
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
                <option value="other">Other</option>
              </select>

              {isOtherSubject && (
                <input
                  type="text"
                  name="otherSubject"
                  placeholder="Enter subject"
                  className="py-3 px-4 mb-4 rounded-md text-[#111] border border-gray-400 w-full"
                  value={otherSubject}
                  onChange={handleOtherSubjectChange}
                />
              )}

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
                Submit
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

export default Page;
