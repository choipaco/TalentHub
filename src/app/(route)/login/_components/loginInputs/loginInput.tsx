import Image from "next/image";
import styles from "./loginInput.module.css";
import { Dispatch, SetStateAction } from "react";
export default function LoginInput(props: {setId:Dispatch<SetStateAction<string>>,setPw:Dispatch<SetStateAction<string>>}) {

  return (
    <>
        <input 
        type="text" 
        placeholder="아이디"
        onChange={(e)=>{props.setId(e.target.value)}}
        className={styles.loginInput}
        />
        <input 
        type="password" 
        placeholder="비밀번호"
        onChange={(e)=>{props.setPw(e.target.value)}} 
        className={`${styles.loginInput} ${styles.loginMargin}`}
        />
    </>
  );
}
