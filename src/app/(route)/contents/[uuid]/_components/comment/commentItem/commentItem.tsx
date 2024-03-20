import timeAgo from "@/utils/time";
import styles from "./commentItem.module.css"
import Image from 'next/image';
import DetailModal from "./detailModal/detailModal";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { deleteCommentApi, updateCommentApi } from "@/app/_service/comments";

interface Comments {
    uuid: string,
    comment: string,
    createdAt: Date
    user: {
        uuid: string;
        id: string;
    };
}
export default function CommentItem(props: {comment?: Comments, content_uuid:string, setUpdateData:Dispatch<SetStateAction<boolean>>}){
    const [isOpen,setIsOpen] = useState(false);
    const [update,setUpdate] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [comment, setComment] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
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
        if(update){
            if(!props.comment?.comment) setComment('')
            else setComment(props.comment?.comment);
        }   
    },[update])

    const updateApi = async() => {
        const success =  await updateCommentApi(props.comment?.uuid, props.content_uuid,comment)
        if(success){
            setUpdate(false);
            setIsOpen(false);
            props.setUpdateData(true);
        }
    }
    const deleteApi = async() => {
        const success =  await deleteCommentApi(props.comment?.uuid)
        if(success){
            setUpdate(false);
            setIsOpen(false);
            props.setUpdateData(true);
        }
    }

    useEffect(()=>{
        if(Delete){
            deleteApi();
        }
    },[Delete])
    return(
        <>
        {
            update ?
            <div className={styles.comment}>
               <div className={styles.commentUserContainer}>
                    <div>
                        <label className={styles.commentUser}>
                        {props.comment?.user.id}    
                        </label> 
                        <label className={styles.times}>
                        {timeAgo(props.comment?.createdAt)}
                        </label>
                    </div>
                </div> 
                <div className={styles.commentInputContainer}>
                    <input type="text" className={styles.inputStyle} value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
                </div>
                <div className={styles.inputBtn}>
                    <button 
                    className={styles.commentSubmitBtn}
                    onClick={()=>{setUpdate(false)}}
                    >
                    취소
                    </button>
                    <button 
                    onClick={updateApi}
                    className={styles.commentSubmitBtn}
                    disabled={comment?.length === 0 ? true : false}
                    >
                    수정
                    </button>
                </div>
            </div>
            :
            <div className={styles.comment}>
                <div className={styles.commentUserContainer}>
                    <div>
                        <label className={styles.commentUser}>
                        {props.comment?.user.id}    
                        </label> 
                        <label className={styles.times}>
                        {timeAgo(props.comment?.createdAt)}
                        </label>
                    </div>
                    <div ref={modalRef}>
                        <Image
                        onClick={()=>{setIsOpen(!isOpen)}}
                        src="/assets/img/dot3.svg"
                        alt="3dot"
                        width={15}
                        height={15}
                        className={styles.starIcon}
                        />
                        <DetailModal comment={props.comment} setUpdate={setUpdate} setDelete={setDelete} isOpen={isOpen}/>
                    </div>
                </div>
                <div>
                    <label className={styles.commentItem}>
                        {props.comment?.comment}
                    </label>
                </div>
            </div>
        }
        </>
    )
}   