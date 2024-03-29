import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    addDoc,
    updateDoc,
    serverTimestamp,
    query,
    where,
    // Query,
    deleteDoc,
    // CollectionReference,
    setDoc,
  } from "firebase/firestore";

  import { app } from "./firebase";

const db = getFirestore(app);



export const setData = (pathToDocument, data) =>{
    return new Promise(
      (resolve, reject) => {
        const docRef = doc(db, pathToDocument);
        setDoc(docRef, data).then(resolve).catch(reject);
      }
    );
  }
 export const  addData = (path, data) =>{
    return new Promise((resolve, reject) => {
      const docRef = collection(db, path);
      addDoc(docRef, {...data,createdAt: serverTimestamp()}).then(resolve).catch(reject);
    });
  }

  export const getData = (path) =>{
    return new Promise(
      (resolve, reject) => {
        const docRef = doc(db, path); // 'coll/id'
        getDoc(docRef).then(resolve).catch(reject);
      }
    )
  };

  export const getDataList = (action)=> {
        return new Promise(
          (
            resolve,
            reject) => {
            const colRef = collection(db, action.path);
            const ref = () => {
              if (action.query) return action.query(colRef,query,where);
              return colRef;
            };
            getDocs(ref()).then(resolve).catch(reject);
          }
        );
      }
    
 export  const    streamDataList = (action) =>{
        const colRef = collection(db, action.path);
        const ref = () => {
          if (action.query) return action.query(colRef,query,where);
          return colRef;
        };
        try {
          onSnapshot(ref(), (snapshot) => {
            action?.snapshot?.(snapshot);
            snapshot.docChanges().forEach((change) => {
              if (!action.logs) return;
              if (change.type === "added")
                console.log("New city: ", change.doc.data());
    
              if (change.type === "modified")
                console.log("Modified city: ", change.doc.data());
    
              if (change.type === "removed")
                console.log("Removed city: ", change.doc.data());
            });
          });
          // action!.unsubscribe!(unsubscribe)
        } catch (error) {
          action?.error?.(error);
        }
      }
    
   export  const updateData =(pathToDocument, data) =>{
        return new Promise(
          (resolve, reject) => {
            const docRef = doc(db, pathToDocument);
            updateDoc(docRef, data).then(resolve).catch(reject);
          }
        );
      }

      export  const deleteData =(pathToDocument) =>{
        return new Promise(
          (resolve, reject) => {
            const docRef = doc(db, pathToDocument);
            deleteDoc(docRef).then(resolve).catch(reject);
          }
        );
      }

      export const fsQuery = query;
export const fsCollection = collection;