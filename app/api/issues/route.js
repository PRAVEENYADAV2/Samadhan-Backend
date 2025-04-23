import db from "@/app/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
    try {
        const issuesRef = collection(db, "issues");

        // Optional: order by creation date (most recent first)
        const q = query(issuesRef, orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(q);
        const issues = [];

        querySnapshot.forEach((doc) => {
            issues.push({ id: doc.id, ...doc.data() });
        });

        return new Response(JSON.stringify(issues), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching issues:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
