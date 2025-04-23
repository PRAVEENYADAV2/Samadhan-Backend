import db from "@/app/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

export async function GET() {
    try {
        const issuesRef = collection(db, "issues");
        const q = query(issuesRef, orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(q);
        const issues = [];

        querySnapshot.forEach((doc) => {
            issues.push({ id: doc.id, ...doc.data() });
        });

        return new Response(JSON.stringify(issues), {
            status: 200,
            headers: {
                ...corsHeaders(),
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching issues:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                ...corsHeaders(),
                "Content-Type": "application/json",
            },
        });
    }
}

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*", // Or replace * with a specific origin like 'http://localhost:3000'
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}
