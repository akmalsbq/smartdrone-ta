import Image from 'next/image'
import Link from 'next/link'
import logodashboard from "../assets/logodashboard.svg"
import styles from '../styles/Main.module.css'
import inactiveelement from "../assets/inactiveelement.svg"
import activegallery from "../assets/activegallery.svg"
import logout from "../assets/logout.svg"
import {Image as Images} from "antd"
import firebaseApp from "../services/firebaseSDK";
import { getDatabase, ref, child, get} from 'firebase/database'
import { db } from "../services/firebaseSDK";
import { collection,getDocs } from "firebase/firestore"
import React, { useEffect, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "../services/firebaseSDK"
import {useRouter} from 'next/router';
import { getStorage, getDownloadURL, ref as sRef} from "firebase/storage";
import { storage } from "../services/firebaseSDK";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export default function Maindashboard() {

          //Firebase Realtime Database
          const [snapshot, setSnapshot]= useState(false)
          const error = useRef(null)
  
          const getValue = async () =>{
              try{
                  const realdata = getDatabase(firebaseApp)
                  const rootReference = ref(realdata)
                  const dbAlt = await get(child(rootReference, 'realtime'))
                  const dbValue = dbAlt.val()
                  setSnapshot([dbValue]);
                  console.log(dbValue)
              } catch (getError){
                  error.current = getError.message
              }
          }
          
          const data = Object.values(snapshot)
  
          useEffect(() => {
             getValue() 
          },[])


          //Firestore
          const [fireData, setFireData] = useState([]);
          const getData = async () =>{
              const databaseRef = await getDocs (collection(db, 'droneResult'))
              .then((response) =>{
                  setFireData(response.docs.map((data) =>{
                      return {...data.data(), id:data.id}
                  }))
              })
          }
          useEffect(()=>{
              getData()
          },[])


          //STORAGE
          const [imageUrl, setImageUrl] = useState("");

          useEffect(() => {
            const imageRef = sRef(storage, "imagecheck.jpg");
            getDownloadURL(imageRef)
              .then((url) => {
                setImageUrl(url);
              })
              .catch((error) => {
                console.error(error);
              });
          }, [])


  return (
   <div className={styles.dashboardwrapper}>
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <div className={styles.topmenu}>
          <Image src={logodashboard} alt="logodashboard" />
          <div className={styles.menu}>
            <div className={styles.menulabel}> MENU </div>
            <div className={styles.list}>
              <Link href="/dashboard">
                <div className={styles.inactivemenu}>
                  <Image src={inactiveelement} alt="element" />
                  <div className={styles.inactivelabel}> Activity </div>
                </div>
              </Link>
              <div className={styles.activemenu}>
                <Image src={activegallery} alt="gallery" />
                <div className={styles.activelabel}> Gallery </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.menulabel}> PENGATURAN AKUN </div>
          <div className={styles.list}>
            <div className={styles.inactivemenu}>
              <Image src={logout} alt="logout" />
              <div className={styles.logoutlabel}> Keluar akun </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.header}> Gallery </div>
        <p className={styles.body}> Gambar yang telah diambil saat drone melakukan aktivitas pengusiran burung </p>
      </div>
      <div className={styles.gallerywrapper}>
        <div className={styles.rowwrapper}>
          <Images
            className={styles.Imagepreview}
            src={imageUrl}
            alt="Gambar"
            width={308}
            height={232}
          />
          <Images
            className={styles.Imagepreview}
            src={imageUrl}
            alt="Gambar"
            width={308}
            height={232}
          />
          <Images
            className={styles.Imagepreview}
            src={imageUrl}
            alt="Gambar"
            width={308}
            height={232}
          />
          <Images
            className={styles.Imagepreview}
            src={imageUrl}
            alt="Gambar"
            width={308}
            height={232}
          />
        </div>
        <div className={styles.rowwrapper}>
        <Images
            className={styles.Imagepreview}
            src={imageUrl}
            alt="Gambar"
            width={308}
            height={232}
          />
        </div>
      </div>
    </div>
   </div>
  )
}
