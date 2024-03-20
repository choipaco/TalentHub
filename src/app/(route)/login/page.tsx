'use client'
import styles from "./page.module.css";
import { useState } from "react";
import LoginInput from "./_components/loginInputs/loginInput";
import LoginButton from "./_components/loginButton/loginButton";
import loginApi from "@/app/_service/auth";
import Sidebar from "@/app/_components/sidebar/sidebar";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const onSubmit = async () => {
    const success = await loginApi(id,pw);
    if(success){
      router.push('/');
    }
};
  return (
    <main className={styles.main}>
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
            <LoginInput setId={setId} setPw={setPw}/>
            <LoginButton onSubmit={onSubmit}/>
            <div className={styles.findIDContainer}>
          </div>
          </div>
        </div>
    </main>
  );
}
