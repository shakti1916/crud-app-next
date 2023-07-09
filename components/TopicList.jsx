import React from "react";
import Removebtn from "./Removebtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopic = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Topic");
    }
    return res.json();
  } catch (error) {
    console.log("error loading topic", error);
  }
};

const TopicList = async () => {
  const { topics } = await getTopic();
  return (
    <>
      {topics.map((t) => (
        <div
          className="p-4 flex justify-between border border-slate-300 my-3"
          key={""}
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>
              <h2>{t.description}</h2>
            </div>
          </div>
          <div className="flex gap-5">
            <Removebtn id={t._id} />
            <Link href={`/edit-topic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicList;
