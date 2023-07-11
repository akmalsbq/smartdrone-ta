import Image from 'next/image'
import logo from "../assets/logo.svg"
import styles from '../styles/Home.module.css'
import {Input, Form, Checkbox, Carousel} from "antd"
import {MailOutlined, LockOutlined} from "@ant-design/icons"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseSDK"
import {useRouter} from 'next/router';
import { useState } from "react";


const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export default function Home({Component, pageProps}) {




  //FIREBASE AUTH

  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();


 const login = async (event) =>{
    try{
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      )
      router.push('/dashboard');
      console.log(user);
    } catch(error){
      setError("Email atau password yang anda masukan salah");
      console.log(error.message);
    }
  } 
  const handleKeyDown = (event) =>{
    if (event.key == "Enter"){
      login(event);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.signin}>
        <Image src={logo} alt="logo" />
          <Form>
            <div className={styles.form}>
              <div className={styles.inputform}>
                <div className={styles.labelform}> Email </div>
                <Form.Item name="email">
                  <Input
                    className={styles.frame}
                    size="large"
                    title="Email"
                    type="text"
                    placeholder="Enter your email"
                    prefix={<MailOutlined />}
                    onChange={(event) =>{
                      setLoginEmail(event.target.value);
                    }}
                  >
                  </Input>
                </Form.Item>
                <div className={styles.labelform}> Password </div>
                <Form.Item name="password">
                  <Input.Password
                    className={styles.frame}
                    size="large"
                    title="Password"
                    placeholder="Enter your password"
                    prefix={<LockOutlined />}
                    onChange={(event) =>{
                      setLoginPassword(event.target.value);
                    }}
                  >
                  </Input.Password>
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className={styles.button} onClick={login}>
            <div className={styles.buttontext}> Sign in</div>
          </div>
          <div className={styles.copyright}>
            <p className={styles.copyrighttext}> © Copyright 2023, Smartdrone Final Task </p>
          </div>
      </div>
    </div>
  )
}
