import db from "@/app/firebaseConfig";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    updateDoc,
    doc,
    arrayUnion
} from "firebase/firestore";

export default async function CreateUpvote({ issueId, userId }) {
    try {
        const upvoteRef = collection(db, "upvotes");

        // Prevent duplicate upvotes
        const q = query(upvoteRef, where("issueId", "==", issueId), where("userId", "==", userId));
        const existing = await getDocs(q);

        if (!existing.empty) {
            return { success: false, message: "Already upvoted" };
        }

        // 1. Add to `upvotes` collection
        const newUpvote = {
            issueId,
            userId,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(upvoteRef, newUpvote);
        console.log("Upvote added with ID:", docRef.id);

        // 2. Update issue document's upvotes array
        const issueDocRef = doc(db, "issues", issueId);
        await updateDoc(issueDocRef, {
            upvotes: arrayUnion(userId)
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding upvote:", error);
        return { success: false, error };
    }
}

