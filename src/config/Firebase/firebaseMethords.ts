import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from "firebase/auth"
import { getDatabase, ref as dbref, set, push, onValue, update } from "firebase/database"
import { getDownloadURL, getStorage, ref as StoreRef, uploadBytesResumable } from "firebase/storage"
import app from "./FirebaseConfig"


let auth = getAuth(app)
let db = getDatabase(app)
let Storage = getStorage(app)

let FirebaseSignup = (UserData: any) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, UserData.Email, UserData.Password)
            .then((res: any) => { let data = { res, UserData }; resolve(data) }).catch(((er: any) => { let data = { er, UserData }; reject(data) }))
    })
}

let FirebaseLogin = (UserData: any) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, UserData.Email, UserData.Password)
            .then((res: any) => { let data = { res, UserData }; resolve(data) }).catch(((er: any) => { let data = { er, UserData }; reject(data) }))
    })
}

let FirebaseSetData = (path: string, Obj: any, key?: any) => {
    return new Promise((resolve, reject) => {
        let Unieqkey = push(dbref(db, "/")).key
        let DbRef = dbref(db, `${path}/${key ?? Unieqkey}`)
        Obj.id = key ?? Unieqkey
        set(DbRef, Obj)
            .then(() => resolve(Obj))
            .catch((er: any) => reject(er))
    })

}

let FirebaseGetData = (path: string) => {
    return new Promise((resolve, reject) => {
        let DbRef = dbref(db, `${path}`)
        onValue(DbRef, (snap: any) => {
            if (snap.exists()) resolve(snap.val())
            else reject(snap)
        })
    })
}

let FirebaseUpdateData = (path: string, id: number | string, Obj: any) => {
    return new Promise((resolve, reject) => {
        let DbRef = dbref(db, `${path}/${id}`)
        update(DbRef, Obj)
            .then((res: any) =>{ console.log(res) ; resolve(res)})
            .catch((er: any) =>{ console.log(er) ; reject(er)})
    })
}


let FirebaseLogout = () => {
    return new Promise((resolve, reject) => {
        signOut(auth).then((e) => {
            resolve(e)
            // Sign-out successful.
        }).catch((error) => {
            reject(error)
            // An error happened.
        });
    })
}

const DeleteUser = (User:any) => {
    return new Promise((resolve, reject) => {
        deleteUser(User).then(() => {
            resolve("Deleted")
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            reject(error)
            // ...
        });
    });
}

const isUserLogin = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user)
            } else {
                reject("User not Login")
            }
        });
    });
}


let FirebaseUploadfile = (file: File, path: string) => {
    return new Promise((resolve, reject) => {
        const storageRef = StoreRef(Storage, `images/${path}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    });
            }
        );
    });
};


export { FirebaseLogin, FirebaseSignup, FirebaseSetData, FirebaseGetData, FirebaseUpdateData, FirebaseLogout, isUserLogin, FirebaseUploadfile ,DeleteUser }