import styles from "./listItem.module.css"
import timeAgo from "@/utils/time";
import { useRouter } from "next/navigation";

interface list{
    uuid:string,
    thumbnail:string,
    title:string,
    views:number,
    createdAt:Date,
    user:{
        uuid:string,
        id:string
    }
}
const ListItem = (props:{data:list}) => {
    const router = useRouter()

    const getContent = () => {
        router.push(`/contents/${props.data.uuid}`)
    }

    const getProfile = () => {
        router.push(`/channel/${props.data.user.uuid}`)
    }
    return(
        <div 
        className={styles.itemContainer}
        >
            <div className={styles.itemImg} onClick={getContent} style={{
                backgroundImage: `url(${props.data.thumbnail})`
            }}/>
            <div className={styles.itemWording}>
                <div className={styles.title} onClick={getContent} >{props.data.title}</div>
                <div className={styles.user} onClick={getProfile}>{props.data.user.id}</div>
                <div className={styles.views}>조회수 {props.data.views}회 · {timeAgo(props.data.createdAt)}</div>
            </div>
        </div>
    )
}

export default ListItem;