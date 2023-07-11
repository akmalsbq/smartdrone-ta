import Image from 'next/image'
import Link from 'next/link'
import logodashboard from "../assets/logodashboard.svg"
import styles from '../styles/Main.module.css'
import element from "../assets/element.svg"
import gallery from "../assets/gallery.svg"
import sensors from "../assets/sensors.svg"
import battery from "../assets/battery.svg"
import logout from "../assets/logout.svg"
import telyu from "../assets/telu.svg"
import {Table, Modal, Button} from "antd"
import { columns} from "../services/Table";
import firebaseApp from "../services/firebaseSDK";
import { getDatabase, ref, child, get} from 'firebase/database'
import { db } from "../services/firebaseSDK";
import { collection,getDocs } from "firebase/firestore"
import React, { useEffect, useRef, useState } from 'react';
import {useRouter} from 'next/router'
import { auth } from "../services/firebaseSDK"



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
          
          //auth
          //const currentUser = auth.currentUser
          //if (currentUser) {
          //  console.log(currentUser.email)
          //} else {
          //  console.log('Tidak ada user yang sedang login')
          //}
          
          //Modal
            const [open, setOpen] = useState(false);
            const [confirmLoading, setConfirmLoading] = useState(false);
            const [modalText, setModalText] = useState('Apakah anda yakin ingin keluar akun?');
            const showModal = () => {
              setOpen(true);
            };
            const handleOk = () => {
              setModalText('Sedangan mengeluarkan akun anda');
              setConfirmLoading(true);
              setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
              }, 2000);
            };
            const handleCancel = () => {
              console.log('Clicked cancel button');
              setOpen(false);
            };
            
            const router = useRouter();
            const logexit = async () =>{
              router.push('/login')
            }
  

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
              <Image src={telyu} alt="telyu"/>
          <div className={styles.menulabel}> PENGATURAN AKUN </div>
          <div className={styles.list}>
            <div className={styles.inactivemenu} onClick={logexit}>
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
