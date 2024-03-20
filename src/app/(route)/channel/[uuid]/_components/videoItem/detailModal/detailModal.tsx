import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./detailModal.module.css"
import { profileApi } from "@/app/_service/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface user {
    uuid:string,
    id:string,
    name:string
}

interface Comments {
    uuid: string,
    comment: string,
    createdAt: Date
    user: {
        uuid: string;
        id: string;
    };
}
const DetailModal = (props:{ isOpen:boolean, setDelete:Dispatch<SetStateAction<boolean>>, user?:string, content_uuid?:string}) => {
    const [user,setUser] = useState<user>();

    const getApi = async() => {
        setUser(await profileApi());
    }
    useEffect(()=>{
        getApi();
    },[])
    return(
        <div
        style={props.isOpen ? {display:'block'}:{display: 'none'}}
        className={styles.main}
        >
            {
                user?.uuid === props.user ?
                <div className={styles.comment}>
                    <Link
                    href={`/contents/update?uuid=${props.content_uuid}`} 
                    className={styles.commentItem}>
                        수정
                    </Link>
                    <div className={styles.commentItem} onClick={()=>{props.setDelete(true)}}>삭제</div>
                </div>
                :
                <div className={styles.comment}>
                    <div className={styles.commentItem}>신고</div>
                </div>
            }
        </div>
    )
}

export default DetailModal;