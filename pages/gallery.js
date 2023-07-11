import Image from 'next/image'
import Link from 'next/link'
import logodashboard from "../assets/logodashboard.svg"
import styles from '../styles/Main.module.css'
import inactiveelement from "../assets/inactiveelement.svg"
import activegallery from "../assets/activegallery.svg"
import logout from "../assets/logout.svg"
import {Image as Images} from "antd"
import React, { useEffect, useRef, useState } from 'react';
import telyu from "../assets/telu.svg"
import { getStorage, getDownloadURL, ref as sRef, listAll} from "firebase/storage";
import { storage } from "../services/firebaseSDK";


export default function Maindashboard() {

          /*//STORAGE
          const [imageUrl, setImageUrl] = useState("");

          useEffect(() => {
            const imageRef = sRef(storage, "capture_0.jpg");
            getDownloadURL(imageRef)
              .then((url) => {
                setImageUrl(url);
              })
              .catch((error) => {
                console.error(error);
              });
          }, [])*/

          /*const [imageList, setImageList] = useState([]);
          const imageListRef = sRef(storage, "images/")

          useEffect(() => {
              listAll(imageListRef).then((response) => {
                const urls = response.items.forEach((item) => {
                  getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                    console.log(response)
                  });
                });
              });
          },[]);*/
        
          const [imageList, setImageList] = useState([]);
          const imageListRef = sRef(storage);

          useEffect(() => {
            listAll(imageListRef).then((response) => {
              const urls = response.items.map((item) => getDownloadURL(item));
              Promise.all(urls).then((downloadUrls) => {
                setImageList(downloadUrls);
              });
            });
          }, []);


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
        <Image src={telyu} alt="telyu"/>
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
          {imageList.map((url, index) => {
            return <Images key={index} src={url} className={styles.Imagepreview} width={308} height={232}/>
          })}
        </div>
      </div>
    </div>
   </div>
  )
}

