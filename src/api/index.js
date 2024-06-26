import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config"
import { toast } from "react-toastify";

export const getUserDetail =()=>{
    return new Promise((resolve,reject)=>{
        const unsubscribe = auth.onAuthStateChanged((userCred)=>{
            if(userCred){
                const userData = userCred.providerData[0];
                
                const unsubscribe = onSnapshot(
                    doc(db, "users", userData?.uid), (_doc)=>{
                        if(_doc.exists()){
                            resolve(_doc.data());
                        }else{
                            setDoc(doc(db, "users", userData?.uid),userData).then(()=>{
                                resolve(userData);
                            });
                        }
                    }
                );

                return unsubscribe;


            }else{
                reject(new Error("user is not authenticated"))

            }


            unsubscribe();

        });
    });
};

export const getTemplates = ()=>{
    return new Promise((resolve)=>{
        const tempQuery = query(
            collection(db, "Templates"),
            orderBy("timestamp","asc")
            );

        const unsubscribe = onSnapshot(tempQuery, (snapshot)=>{
            const templates = snapshot.docs.map((doc) => {
                return doc.data();
            });
            resolve(templates);
        })
        return unsubscribe;
    })
}

export const getTemplateDetailsById =async(id)=>{
    
        const docRef = doc(db, "Templates", id);
        const docSnap =  await getDoc(docRef);

        if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return (docSnap.data());
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");

        }
           
}

export const saveToCollection=async(userData, tempData)=>{
    console.log(userData.uid, tempData._id);
   if(!userData.collection.includes(tempData._id)){
    const docref = doc(db, "users", userData?.uid);
    await updateDoc(docref,{
        collection : arrayUnion(tempData._id)
    }).then(()=>{
        toast.success("Template added to collection successfully");
    }).catch((error)=>{
        toast.error(`Error : ${error.message}`);
    })
   }else{
    const docref = doc(db, "users", userData?.uid);
    await updateDoc(docref,{
        collection : arrayRemove(tempData._id)
    }).then(()=>{
        toast.success("Template Removed");
    }).catch((error)=>{
        toast.error(`Error : ${error.message}`);
    })
   }
}

export const saveToFavourite=async(userData, tempData)=>{
    console.log(userData.uid, tempData._id);
if(!tempData.favourite.includes(userData.uid)){
    const docref = doc (db,'Templates',tempData?._id);
    await updateDoc(docref,{
        favourite : arrayUnion(userData?.uid)
    }).then(()=>{
        toast.success("Template Added to favourite successfully");
    }).catch((error)=>{
        toast.error(`Error : ${error.message}`);
    })
}else{
    const docref = doc(db,'Templates',tempData?._id);
    await updateDoc(docref,{
        favourite : arrayRemove(userData?.uid)
    }).then(()=>{
        toast.success("Removed from favourite");
    }).catch((error)=>{
        toast.error(`Error : ${error.message}`);
    })
}
}

export const getTemplateDetailEditByUser = (uid, id) => {
    return new Promise((resolve, ) => {
      const unsubscribe = onSnapshot(
        doc(db, "users", uid, "resumes", id),
        (doc) => {
          resolve(doc.data());
        }
      );
  
      return unsubscribe;
    });
  };

  export const getSavedResumes=(uid)=>{
    // console.log('UID',uid);
    return new Promise((resolve, ) => {
       const temQuery = query(
         collection(db, "users", uid, "resumes"),
         
       );

       const unsubscribe = onSnapshot(temQuery, (snapshot) => {
         const resumes = snapshot.docs.map((doc) => doc.data());
         resolve(resumes);
         console.log(resumes);
         
       });
        return unsubscribe;
      });
  }