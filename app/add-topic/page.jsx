"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and desription require");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.refresh()
        router.push("/");
      } else {
        throw new Error("failed to create a topic");
      }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Topic Title"
        className="border border-slate-500 px-8 py-2"
        value={title}
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Topic Description"
        className="border border-slate-500 px-8 py-2"
        value={description}
      />

      <button
        type="submit"
        className="bg-green-500 px-2 py-2 w-fit text-white rounded-md font-bold"
      >
        Add Topic
      </button>
    </form>
  );
};

export default AddTopic;
