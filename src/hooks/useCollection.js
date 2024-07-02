import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereOptions) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), where(...whereOptions));

    const getData = async () => {
      onSnapshot(q, (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
          console.log(doc);
          todos.push({ id: doc.id, ...doc.data() });
        });
        setData(todos);
      });
    };

    getData();
  }, [collectionName]);

  return { data };
};
