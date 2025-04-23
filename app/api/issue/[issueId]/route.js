import db from "@/app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {
    const { issueId } = params;

    if (!issueId) {
        return new Response(JSON.stringify({ error: "Issue ID is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const issueDocRef = doc(db, "issues", issueId);
        const issueSnap = await getDoc(issueDocRef);

        if (!issueSnap.exists()) {
            return new Response(JSON.stringify({ error: "Issue not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ id: issueSnap.id, ...issueSnap.data() }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching issue:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
