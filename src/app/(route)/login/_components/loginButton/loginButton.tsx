import Image from "next/image";
import styles from "./loginButton.module.css";
import axios from "axios";
export default function LoginButton(props: {onSubmit:Function}) {
 
  return (
    <button className={`${styles.loginBtn} iconColorBack`} onClick={()=>{props.onSubmit()}}>
        로그인 하기
    </button>
  );
}
