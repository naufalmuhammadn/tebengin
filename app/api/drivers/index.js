import { collection, getDocs, doc, getDoc, query, where  } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const getDrivers = async () => {
    const driversRef = collection(db, "drivers");
    const driversSnapshot = await getDocs(driversRef);
    const driversList = driversSnapshot.docs.map((doc) => doc.data());
    return driversList;
}

export const getDriversByType = async (type) => {
    const driversRef = collection(db, "drivers");
    const driverQuery = query(driversRef, where("type", "==", type));
    const querySnapshot = await getDocs(driverQuery);
    const driversList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    return driversList;
}

export const getDriver = async (id) => {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
}