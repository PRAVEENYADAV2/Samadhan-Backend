// app/api/complaints/route.js

import { NextResponse } from "next/server";
import CreateIssue from "@/utils/CreateIssues";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Replace * with your frontend domain in production
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight CORS requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
    try {
        const data = await req.json();

        // Validate input
        const requiredFields = ['title', 'description', 'photoUrl', 'lat', 'lng', 'userId', 'region', 'priority'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json(
                    { message: `Missing field: ${field}` },
                    { status: 400, headers: corsHeaders }
                );
            }
        }

        const result = await CreateIssue(data);

        if (result.success) {
            return NextResponse.json(
                { message: "Issue created", id: result.id },
                { status: 201, headers: corsHeaders }
            );
        } else {
            return NextResponse.json(
                { message: "Failed to create issue", error: result.error },
                { status: 500, headers: corsHeaders }
            );
        }
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}
