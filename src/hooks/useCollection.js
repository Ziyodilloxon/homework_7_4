import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = [];
      querySnapshot.docs.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setData(items);
    };
    getData();
  }, [collectionName]);

  return { data };
};
