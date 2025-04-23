import { NextResponse } from "next/server";
import CreateIssue from "@/utils/CreateIssues";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Replace with specific domain in production
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Parse fields
        const title = formData.get('title');
        const description = formData.get('description');
        const lat = parseFloat(formData.get('lat'));
        const lng = parseFloat(formData.get('lng'));
        const userId = formData.get('userId');
        const region = formData.get('region');
        const priority = formData.get('priority');
        const file = formData.get('photo'); // assuming "photo" is the name of file input

        let photoUrl = null;

        // Upload to Cloudinary if file exists
        if (file && file.size) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + file.name.replaceAll(" ", "_");
            const cloudinaryData = new FormData();

            cloudinaryData.append('file', new Blob([buffer]), filename);
            cloudinaryData.append('upload_preset', "college_chan");

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/dkqo6add7/image/upload`, {
                method: 'POST',
                body: cloudinaryData,
            });

            if (!uploadRes.ok) throw new Error('Cloudinary upload failed');

            const uploadJson = await uploadRes.json();
            photoUrl = uploadJson.secure_url;
        }

        // Final complaint object
        const complaint = {
            title,
            description,
            photoUrl,
            lat,
            lng,
            userId,
            region,
            priority,
        };

        // Validate required fields
        const requiredFields = ['title', 'description', 'photoUrl', 'lat', 'lng', 'userId', 'region', 'priority'];
        for (const field of requiredFields) {
            if (!complaint[field]) {
                return NextResponse.json(
                    { message: `Missing field: ${field}` },
                    { status: 400, headers: corsHeaders }
                );
            }
        }

        const result = await CreateIssue(complaint);

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
