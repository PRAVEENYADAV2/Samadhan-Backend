import db from "@/app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {

    let { id } = await params;


    if (!id[0]) {
        return new Response(JSON.stringify({ error: "User ID is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const docRef = doc(db, "users", id[0]);
        const userSnap = await getDoc(docRef);

        if (!userSnap.exists()) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ id: userSnap.id, ...userSnap.data() }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
