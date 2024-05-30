import { db } from "../../../firebase/config";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { getUser } from "../users";

export const getRides = async (id) => {
    const ongoing = [];
    const completed = [];
    const cancelled = [];

    const q = query(collection(db, "rides"), where("userId", "==", id))
    const querySnapshot = await getDocs(q);

    for (const ride of querySnapshot.docs) {
        const rideData = ride.data();

        const driverRef = await doc(db, "drivers", rideData.driverId);
        const driverSnap = await getDoc(driverRef);
        const driverData = driverSnap.data();

        const userData = await getUser(id);

        const formattedRide = {
            id: ride.id,
            pickUp: rideData.pickUp,
            destination: rideData.destination,
            departureTime: rideData.departureTime,
            price: formatPrice(rideData.price),
            status: rideData.status,
            user: userData.name,
            driver: driverData.name,
            driverType: driverData.type,
            driverMerk: driverData.merk,
            plat: driverData.plat,
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

export const getRide = async (id) => {
    const rideRef = doc(db, "rides", id);
    const rideSnap = await getDoc(rideRef);

    const rideData = rideSnap.data();

    const driverRef = await doc(db, "drivers", rideData.driverId);
    const driverSnap = await getDoc(driverRef);
    const driverData = driverSnap.data();
    const userData = await getUser(rideData.userId);

    const formattedRide = {
        id: id,
        destination: rideData.destination,
        pickUp: rideData.pickUp,
        departureTime: rideData.departureTime,
        price: +rideData.price,
        status: rideData.status,
        user: userData.displayName,
        driver: driverData.name,
        driverType: driverData.type,
        driverMerk: driverData.merk,
        plat: driverData.plat,
        date: formatDate(rideData.date),
        rating: rideData.rating,
        ulasan: rideData.ulasan,
        ratingStatus: rideData.ratingStatus
    };

    return formattedRide;
}

export const updateRideRating = async (id, rating, ulasan, ratingStatus) => {
    const rideRef = doc(db, "rides", id);
    await updateDoc(rideRef, {
        rating,
        ulasan,
        ratingStatus
    });
}

export const createRide = async (destination, driverId, pickUp, price, userId, departureTime) => {
    await addDoc(collection(db, "rides"), {
        destination,
        departureTime,
        driverId,
        pickUp,
        price,
        userId,
        status: "ongoing",
        date: new Date(),
    });
}

const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

const formatPrice = (price) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
