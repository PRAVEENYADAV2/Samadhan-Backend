import db from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function CreateComment(params) {
    try {
        const commentRef = collection(db, "comments");

        const newComment = {
            issueId: params.issueId,
            userId: params.userId,
            text: params.text,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(commentRef, newComment);
        console.log("Comment added with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding comment:", error);
        return { success: false, error };
    }
}
