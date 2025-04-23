// app/api/complaints/route.js

import { NextResponse } from "next/server";
import CreateIssue from "@/utils/CreateIssues";

export async function POST(req) {
    try {
        const data = await req.json();

        // Optional: Validate input
        const requiredFields = ['title', 'description', 'photoUrl', 'lat', 'lng', 'userId', 'region', 'priority'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json({ message: `Missing field: ${field}` }, { status: 400 });
            }
        }

        const result = await CreateIssue(data);

        if (result.success) {
            return NextResponse.json({ message: "Issue created", id: result.id }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Failed to create issue", error: result.error }, { status: 500 });
        }
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}