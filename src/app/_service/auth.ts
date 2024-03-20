import axiosInstance from "@/utils/axios";
import { setCookie } from "@/utils/cookies";
import axios from "axios";


export default async function loginApi(id:string, password:string) {
    if(!id) return alert("아이디를 입력해주세요");
    if(!password) return alert("비밀번호를 입력해주세요");
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/login`, {
            id,
            pw: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.data.success){
            setCookie('successLogin',res.data.token,{path : '/'});
        }else{
            alert(res.data.message);
        }
        return res.data.success; 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}


export async function registerApi(email:string, id:string, password:string,repassword:string, name:string, tokenChk:boolean) {
    if(!name) return alert("이름을 입력해주세요");
    if(!email) return alert("이메일을 입력해주세요");
    if(!tokenChk) return alert("이메일을 인증해주세요");
    if(!id) return alert("아이디를 입력해주세요");
    if(!password) return alert("비밀번호를 입력해주세요");
    if(!repassword) return alert("비밀번호 확인을 입력해주세요");
    if(password !== repassword) return alert("비밀번호가 일치하지 않습니다");
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/register`, {
            email,
            id,
            pw: password,
            name,
            isEmailAuth: tokenChk
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.status === 201){
            return true;
        }
        return alert("회원가입에 실패하였습니다"); 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}

export async function profileApi() {
    
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/infor/me`, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data.user; 
    } catch (error:any) {
        return false;
    }
}


export async function otherProfileApi(uuid?:string) {
    if(!uuid) return alert('uuid를 적어주세요')
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/infor/${uuid}`, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data.user; 
    } catch (error:any) {
        alert(error.response.data.message);
        return;
    }
}
