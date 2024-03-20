import { useEffect, useState } from "react";
import styles from "./video.module.css"
import { checkSub, inforApi, subOff, subOn } from "@/app/_service/content";
import Image from "next/image";
import { formatDate } from "@/utils/time";
import { getCookie } from "@/utils/cookies";
import createCommentApi from "@/app/_service/comments";
import Comment from "../comment/comment";

interface SearchResponse {
    success: boolean;
    message: string;
    search: {
        uuid: string;
        thumbnail: string;
        video: string;
        title: string;
        explanation: string;
        views: number;
        createdAt: string;
        user: {
            uuid: string;
            id: string;
        };
    };
  }

  interface Check{
    uuid:string
  }

export default function Video(props: {uuid: string}){
    const [data, setData] = useState<SearchResponse>();
    const [check,setCheck] = useState<Check>();
    const getApi = async(uuid:string) =>{
        setData(await inforApi(uuid));
    }
    useEffect(()=>{
        if(props.uuid){
            getApi(props.uuid);
        }
    },[props.uuid])

    useEffect(()=>{
        checking();
    },[data])

    const checking = async() =>{
        setCheck(await checkSub(data?.search.user.uuid))
    }

    const subscribeOn = async() => {
        const success = await subOn(data?.search.user.uuid);

        if(success){
            checking();
        }
    }

    const subscribeOff = async() => {
        const success = await subOff(check?.uuid);

        if(success){
            checking();
        }
    }
    
    return(
        <div className={styles.main}>
            <div className={styles.videoContainer}>
                <video className={styles.video} src={data?.search.video} controls autoPlay controlsList="nodownload"/>
                <div className={styles.contentsContainer}>
                    <div className={styles.title}>
                        {data?.search.title}
                    </div>
                    <div className={styles.contentsUser}>
                        <label>
                            {data?.search.user.id} 
                        </label>
                        {
                            check ?
                            <label onClick={subscribeOff} className={`${styles.subscribe} iconColorBack`}>
                            구독중
                            </label>
                            :
                            <label onClick={subscribeOn} className={`${styles.subscribe} iconColorBack`}>
                            구독
                            </label>
                        }
                        <label 
                        className={styles.star}
                        >
                        </label>
                    </div>
                    <div className={styles.ex}>
                        <label className={styles.exTitle}>
                            조회수 {data?.search.views}회 {formatDate(data?.search.createdAt)}
                        </label>
                        <p className={styles.exText}>
                            {data?.search.explanation}
                        </p>
                    </div>
                </div>
                
                <Comment uuid={props.uuid}/>
            </div>  
        </div>
    )
}