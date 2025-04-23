import db from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function CreateUser(params) {
    try {
        const userRef = collection(db, "users");

        const newUser = {
            name: params.name,
            email: params.email,
            role: params.role || "citizen",
            createdAt: serverTimestamp(),
            badges: [],
            location: {
                lat: params.lat || null,
                lng: params.lng || null
            },
            profileUrl: params.profileUrl || null
        };

        const docRef = await addDoc(userRef, newUser);
        console.log("User created with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error };
    }
}
