import Link from 'next/link'
import styles from './subscribeItem.module.css'

export default function SubscribeItem(props:{uuid:string, id:string}){
    return(
        <div className={styles.main}>
            <Link
            href={`/channel/${props.uuid}`} 
            className={styles.link}
            >
            {props.id}
            </Link>
        </div>
    )
}