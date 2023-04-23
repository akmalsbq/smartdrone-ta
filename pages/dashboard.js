import Image from 'next/image'
import Link from 'next/link'
import logodashboard from "../assets/logodashboard.svg"
import styles from '../styles/Main.module.css'
import element from "../assets/element.svg"
import gallery from "../assets/gallery.svg"
import sensors from "../assets/sensors.svg"
import battery from "../assets/battery.svg"
import logout from "../assets/logout.svg"
import {Table} from "antd"
import { columns, data } from "../services/Table";
import firebaseApp from "../services/firebaseSDK";
import { getDatabase, ref, child, get} from 'firebase/database'
import { db } from "../services/firebaseSDK";
import { collection,getDocs } from "firebase/firestore"
import {MailOutlined, LockOutlined} from "@ant-design/icons"
import React, { useEffect, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseSDK"
import {useRouter} from 'next/router';

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


  return (
   <div className={styles.dashboardwrapper}>
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <div className={styles.topmenu}>
          <Image src={logodashboard} alt="logodashboard" />
          <div className={styles.menu}>
            <div className={styles.menulabel}> MENU </div>
            <div className={styles.list}>
              <div className={styles.activemenu}>
                <Image src={element} alt="element" />
                <div className={styles.activelabel}> Activity </div>
              </div>
              <Link href="/gallery">
                <div className={styles.inactivemenu}>
                  <Image src={gallery} alt="gallery" />
                  <div className={styles.inactivelabel}> Gallery </div>
                </div>
              </Link>
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
        <div className={styles.header}> Activity </div>
        <p className={styles.body}> Hello, John doe! This is the last monitoring result of the drone</p>
      </div>
      <div className={styles.cardbird}>
        <div className={styles.content}>
          <div className={styles.cardheader}> Burung terdeteksi</div>
          <div>
            {data.map((item) => {
                          return(
                              <div key={item.burung}>
                                  <div className={styles.carddata}> {item.burung} </div>
                              </div>
                          )
                      })}
          </div>
          <div className={styles.body}> Ekor </div>
        </div>
        <Image src={sensors} alt="sensors" />
      </div>
      <div className={styles.cardbattery}>
        <div className={styles.content}>
          <div className={styles.cardheader}> Status baterai</div>
          <div className={styles.carddata}>90%</div>
          <div className={styles.body}> Voltage (maAh) </div>
        </div>
        <Image src={battery} alt="battery" />
      </div>
      <div className={styles.tablewrapper}>
        <div>
          <div className={styles.tableheader}> Baru baru ini </div>
          <p className={styles.body}> Beberapa data penerbangan yang dilakukan sebelumnya </p>
        </div>
        <Table
          size="small"
          columns={columns}
          dataSource={fireData}
        />
      </div>
    </div>
   </div>
  )
}
