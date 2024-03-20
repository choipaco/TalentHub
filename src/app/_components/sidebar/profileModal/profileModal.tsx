import Image from "next/image"
import styles from "./profileModal.module.css"
import Link from "next/link"
import { removeCookie } from "@/utils/cookies"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function ProfileModal(props:{isOpen:boolean, setIsLogout: Dispatch<SetStateAction<boolean>>}){
    const router = useRouter();
    const onClickLogout = () => {
        props.setIsLogout(true);
      
    }
    return(
        <div className={styles.main}
        style={props.isOpen ? {display:'block'}:{display: 'none'}}
        >
            <div className={styles.modalContainer}>
                <div className={styles.homeContainer}>
                    <Link
                    href={'/'} 
                    className={styles.home}>
                        <Image 
                        src="/assets/img/home.svg"
                        alt="홈"
                        width={28}
                        height={28}
                        className={styles.searchIconColor}
                        />  
                        <div className={styles.homeText}>홈</div>
                    </Link>
                </div>

                <div className={styles.homeContainer}>
                    <Link
                    href={'/channel/me'}
                    >
                        <div className={styles.home}>
                            <Image 
                            src="/assets/img/profile.svg"
                            alt="내 채널"
                            width={28}
                            height={28}
                            className={styles.searchIconColor}
                            />
                            <div className={styles.homeText}>내 채널</div>
                        </div>
                    </Link>
                </div>

                <div className={styles.homeContainer}>
                    <div className={styles.home} onClick={onClickLogout}>
                        <Image 
                        src="/assets/img/logout.svg"
                        alt="로그아웃"
                        width={28}
                        height={28}
                        className={styles.searchIconColor}
                        />
                        <div className={styles.homeText} >로그아웃</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

