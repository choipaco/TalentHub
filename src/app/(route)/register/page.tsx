'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Inputs from "./_components/Inputs/Inputs";
import LoginButton from "./_components/loginButton/loginButton";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { registerApi } from "@/app/_service/auth";
import emailVerificationApi, { tokenVerificationApi } from "@/app/_service/email";
import Sidebar from "@/app/_components/sidebar/sidebar";
export default function Home() {
  const router = useRouter();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 정규식
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [acountNum, setAcountNum] = useState('');
  const [id, setId] = useState('');
  const [idExists,setIdExists] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emailOn, setEmailOn] = useState(false);
  const [acountNumOn, setAcountNumOn] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [tokenChk, setTokenChk] = useState(false);
  const onSubmit = async () => {
    const register = await registerApi(email,id,password,rePassword,name,tokenChk);
    if(register){
      alert("회원가입이 완료되었습니다.")
      router.push('/login')
    }
  };

  const emailVerification = async () => {
    const mail = await emailVerificationApi(email);
    if(mail){
      setEmailOn(false);
      setAcountNumOn(true);
      setEmailInput(true);
    }
  }
  const tokenVerification = async () => {
    const mail = await tokenVerificationApi(email,acountNum);
    if(mail){
      setEmailOn(false);
      setAcountNumOn(false);
      setEmailInput(true);
      setTokenChk(true);
    }
  }

  
useEffect(()=>{
  if(emailRegex.test(email)){
    setEmailOn(true);
  }else{
    setEmailOn(false);
  }
},[email])
  return (
    <main>
        <Sidebar/>
        <div className={styles.loginContainer}>

        <h1 className={styles.loginTitle}>
            <label className={styles.loginTitleColor1}>
            <label className="iconColor">
                T
            </label>
            alent
            <label className="iconColor">
                H
            </label>
            ub
            </label>
          </h1>

          <div className={styles.loginFormContainer}>
            <Inputs 
            setName={setName} 
            setBirth={setBirth} 
            setEmail={setEmail} 
            setAcountNum={setAcountNum} 
            setId={setId} 
            id={id}
            setPassword={setPassword} 
            setRePassword={setRePassword} 
            emailOn={emailOn}
            acountNumOn={acountNumOn}
            emailInput={emailInput}
            emailVerification={emailVerification}
            tokenVerification={tokenVerification}
            idExists={idExists}
            />
            <LoginButton onSubmit={onSubmit}/>
            <div className={styles.findIDContainer}>
            </div>
          </div>
        </div>
    </main>
  );
}
