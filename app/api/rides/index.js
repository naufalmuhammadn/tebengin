import { db } from "../../../firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export const getRides = async () => {
    const ongoing = [];
    const completed = [];
    const cancelled = [];

    const querySnapshot = await getDocs(collection(db, "rides"));
    for (const ride of querySnapshot.docs) {
        const rideData = ride.data();

        const driverDoc = await doc(db, "drivers", rideData.driverId);
        const userDoc = await doc(db, "users", rideData.userId);
        const driverData = await getDoc(driverDoc);
        const userData = await getDoc(userDoc);

        const formattedRide = {
            id: ride.id,
            destination: rideData.destination,
            departureTime: rideData.departureTime,
            price: rideData.price,
            status: rideData.status,
            user: userData.data().name,
            driver: driverData.data().name,
            plat: driverData.data().plat,
        };

        switch (formattedRide.status) {
            case "ongoing":
                ongoing.push(formattedRide);
                break;
            case "completed":
                completed.push(formattedRide);
                break;
            case "cancelled":
                cancelled.push(formattedRide);
                break;
            default:
                break;
        }
    }

    return { ongoing, completed, cancelled };
};
