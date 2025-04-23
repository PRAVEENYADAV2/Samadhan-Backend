import db from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function CreateIssue(params) {
    try {
        const issueRef = collection(db, "issues");

        const newIssue = {
            title: params.title,
            description: params.description,
            photoUrl: params.photoUrl || "",
            location: {
                lat: params.lat,
                lng: params.lng,
            },
            userId: params.userId,
            createdAt: serverTimestamp(),
            status: "received",
            upvotes: [],
            region: params.region || "",
            priority: params.priority,
            comments: [],
        };

        const docRef = await addDoc(issueRef, newIssue);
        console.log("Issue created with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating issue:", error);
        return { success: false, error };
    }
}
