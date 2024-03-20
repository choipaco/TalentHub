import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./detailModal.module.css"
import { profileApi } from "@/app/_service/auth";
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
const DetailModal = (props:{comment?:Comments, isOpen:boolean, setUpdate:Dispatch<SetStateAction<boolean>>, setDelete:Dispatch<SetStateAction<boolean>>}) => {
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
                user?.uuid === props.comment?.user.uuid ?
                <div className={styles.comment}>
                    <div className={styles.commentItem} onClick={()=>{props.setUpdate(true)}}>수정</div>
                    <div className={styles.commentItem} onClick={()=>{props.setDelete(true)}}>삭제</div>
                </div>
                :
                <div>
                    <div>신고</div>
                </div>
            }
        </div>
    )
}

export default DetailModal;