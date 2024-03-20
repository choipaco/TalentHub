import styles from "./videoList.module.css"
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import VideoItem from "../videoItem/videoItem";
interface User {
    uuid: string;
    id: string;
    email: string;
    name: string;
    pw: string;
    contents: list[];
}


interface list{
    uuid:string,
    thumbnail:string,
    title:string,
    views:number,
    createdAt:Date,
}
const VideoList = (props:{Search?:User}) => {
    
    return(
        <div className={styles.main}>
            {
                 props.Search?.contents?.length ?
                props.Search?.contents.map((it)=>{
                    return(
                        <VideoItem userUuid={props.Search?.uuid} data={it} />
                    )
                })
                :
                <div className={styles.notSearch}>
                    내 채널에 콘텐츠가 없습니다
                </div>
            }
        </div>
    )
}

export default VideoList;