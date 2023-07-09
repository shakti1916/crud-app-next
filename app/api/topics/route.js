import connectDB from "@/libs/mongodb"
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export  async function POST (req) {
    const {title,description} = await req.json()
    await connectDB();
    await Topic.create({title,description});
    return NextResponse.json({message:"Topic Created"},{status:201})
}

export async function GET () {
    await connectDB()
    const topics =await Topic.find()
    return NextResponse.json({topics})
}

export async function DELETE (req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectDB()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({message:"Topic deleted"},{status:200})
}

