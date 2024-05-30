import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const getUser = async (id) => {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
}