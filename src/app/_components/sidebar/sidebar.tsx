'use client'
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from 'next/navigation'
import styles from "./sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { getCookie, removeCookie } from "@/utils/cookies";
import { profileApi } from "@/app/_service/auth";
import ProfileModal from "./profileModal/profileModal";
//TalentHub

export default function Sidebar(){    
    const [saerch, setSearch] = useState('');
    const [user, setUser] = useState<any>();
    const [isOpen,setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isLogout, setIsLogout] = useState(false);
    const [road, setRoad] = useState(false);
    const router = useRouter()
    const select = () =>{
        router.push(`/?search=${saerch}`);
    }
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/?search=${saerch}`);
        }
    };

    useEffect(()=>{
        setRoad(true);
    },[])
    const getApi = async()=>{
        setUser(await profileApi());
    }
    useEffect(()=>{
        if(getCookie('successLogin')){
            getApi();
        }
    },[getCookie('successLogin')])

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node))    {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    useEffect(()=>{
        if(isLogout){
            removeCookie('successLogin');
            router.refresh();
        }
    },[isLogout])
    return(
        road ?
       <nav className={styles.main}>
        <div className={styles.icon}>
           <Link href={'/'} className={styles.iconLink}>
                <label className="iconColor">
                    T
                </label>
                alent
                <label className="iconColor">
                    H
                </label>
                ub
           </Link>
        </div>
        <div className={styles.searchInputContainer}>
            <input type="text" className={styles.searchInput} onChange={(e)=>{setSearch(e.target.value)}} 
            onKeyDown={handleKeyPress}></input>
            <label
            className={styles.searchIcon}
            >
                <Image 
                onClick={select}
                src="/assets/img/search.svg"
                alt="검색아이콘"
                width={28}
                height={28}
                className={styles.searchIconColor}
                />
            </label>
        </div>
        {
            getCookie('successLogin') ?
            <div className={styles.profile}>
                <div ref={modalRef}>
                <label onClick={()=>{setIsOpen(!isOpen)}} className={styles.profileId}>{user?.id}</label>
                <ProfileModal setIsLogout={setIsLogout} isOpen={isOpen}/>
                </div>
                <div>
                    <Link
                    href={'/contents/create'}
                    >
                    <Image 
                    src="/assets/img/videoadd.svg"
                    alt="만들기"
                    width={28}
                    height={28}
                    className={styles.videoAddIcon}
                    />
                    </Link>
                </div>
            </div>
            :
            <div className={styles.beforeLogin}>
                <Link href={'/login'}>로그인</Link>
                <Link href={'/register'}>회원가입</Link>
            </div>
        }
       </nav>
       :
       <></>
    )
}