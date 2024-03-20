import styles from "./videoList.module.css"
import VideoItem from "../videoItem/videoItem";
interface SearchResult {
    success: boolean;
    message: string;
    search: SearchItem[];
}

interface SearchItem {
    uuid: string;
    thumbnail: string;
    title: string;
    views: number;
    createdAt: Date;
    user: {
        uuid: string;
        id: string;
    };
}
const VideoList = (props:{Search?:SearchResult}) => {

    return(
        <div className={styles.main}>
            {
                props.Search?.search.length ?
                props.Search?.search.map((it)=>{
                    return(
                        <VideoItem data={it} />
                    )
                })
                :
                <div className={styles.notSearch}>
                    검색결과가 없습니다
                </div>
            }
        </div>
    )
}

export default VideoList;