"use client";

import { useState } from "react";
import CreateIssue from "@/utils/CreateIssues"; // adjust the path as needed

export default function IssueForm() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const handleCreateIssue = async () => {
        setLoading(true);

        const fakeIssue = {
            title: "Streetlight Not Working",
            description: "The streetlight on 5th Avenue has been out for 3 days.",
            photoUrl: "https://www.lummi.ai/api/render/image/5205533d-5d43-49e6-bd58-fd421cbd501f?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyMDU1MzNkLTVkNDMtNDllNi1iZDU4LWZkNDIxY2JkNTAxZiIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiQUlxbVkzX0pfNWREbDM4RkYzMmE3IiwiaWF0IjoxNzQ1MzExOTEyLCJleHAiOjE3NDUzMTE5NzJ9.MzszfbwHvUu3dFqoBvV6_aD5pLq2EYZLFN09NxjMi74",
            lat: 12.9718,
            lng: 77.5940,
            userId: "testUser001",
            region: "Ward 5",
            priority: "medium"
        };

        const result = await CreateIssue(fakeIssue);
        console.log(result)
        setResponse(result.success ? `Issue created with ID: ${result.id}` : `Error: ${result.error.message}`);
        setLoading(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Create a Test Issue</h2>
            <button
                onClick={handleCreateIssue}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Fake Issue"}
            </button>
            {response && <p className="mt-3 text-gray-700">{response}</p>}
        </div>
    );
}
