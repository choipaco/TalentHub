import styles from "./videoItem.module.css"
import fetcher from "@/utils/fetcher";
import timeAgo from "@/utils/time";
import Image from "next/image";
import Link from "next/link";
import DetailModal from "./detailModal/detailModal";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteContentApi } from "@/app/_service/content";

interface list{
    uuid:string,
    thumbnail:string,
    title:string,
    views:number,
    createdAt:Date,
}
const VideoItem = (props:{data:list, userUuid?:string}) => {
    const router = useRouter();
    const [isOpen,setIsOpen] = useState(false);
    const [update,setUpdate] = useState(false);
    const [Delete, setDelete] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const deleteApi = async() => {
        const success =  await deleteContentApi(props.data?.uuid)
        if(success){
            alert("삭제되었습니다")
        }
    }


    useEffect(()=>{
        if(Delete){
            deleteApi();
        }
    },[Delete])
    
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

    const route = () =>{
        router.push(`/contents/${props.data.uuid}`);
    }
    return(
        <div 
        className={styles.itemContainer}
        >
            <div className={styles.itemImg} 
            onClick={route}
            style={{
                backgroundImage: `url(${props.data.thumbnail})`
            }}/>
            <div className={styles.itemWording}>
                <div className={styles.title}>
                    <div
                    onClick={route}
                    >{props.data.title}</div>
                    <div ref={modalRef} className={styles.detailModal}>
                        <Image
                        onClick={()=>{setIsOpen(!isOpen)}}
                        src="/assets/img/dot3.svg"
                        alt="3dot"
                        width={20}
                        height={20}
                        />
                        
                    </div>
                    <DetailModal user={props.userUuid} content_uuid={props.data.uuid} setDelete={setDelete} isOpen={isOpen}/>
                </div>
                <div className={styles.views}>조회수 {props.data.views}회 · {timeAgo(props.data.createdAt)}</div>
            </div>
        </div>
    )
}

export default VideoItem;