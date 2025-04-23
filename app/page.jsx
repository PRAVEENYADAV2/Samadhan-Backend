"use client";
import IssueForm from "@/Components/IssueCreate";
import { useState } from "react";
import CreateUser from "@/utils/Createuser"; // Adjust the path as needed

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleCreateUser = async () => {
    setLoading(true);
    const result = await CreateUser({
      name: "Praveen",
      email: "hp15spraveen@gmail.com",
      lat: 12.9716,
      lng: 77.5946,
      profileUrl: "https://images.pexels.com/photos/110686/pexels-photo-110686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    });
    setResponse(result.success ? `User ID: ${result.id}` : `Error: ${result.error.message}`);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Hello</h1>
      <button
        onClick={handleCreateUser}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create User"}
      </button>
      {response && <p className="mt-3 text-sm text-gray-700">{response}</p>}
      <IssueForm></IssueForm>
    </div>
  );
}
