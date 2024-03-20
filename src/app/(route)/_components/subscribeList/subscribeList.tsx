import { getCookie } from '@/utils/cookies';
import SubscribeItem from '../subscribeItem/subscribeItem';
import styles from './subscribeList.module.css';
import { subList } from '@/app/_service/content';
import { useEffect, useState } from 'react';

interface list{
    uuid:string,
    uploader: {
        uuid:string,
        id:string
    }
}
export default function SubscribeList(){
    const [road, setRoad] = useState(false);
    const [data,setData] = useState<list[]>();
    const getList = async() => {
        if(getCookie('successLogin')){
            setData(await subList());
        }
    }
    useEffect(()=>{
        setRoad(true)
    },[])
    useEffect(()=>{
        getList()
    },[getCookie('successLogin')])
    return(
        <div className={styles.main}>
            <div className={styles.ListOverflow}>
                <div className={styles.title}>
                    구독 리스트
                </div>
                <div>
                    {
                        road ?
                        <>
                        {
                            getCookie('successLogin') ?
                            <div>
                                {
                                    data?.map((it)=>{
                                        return(
                                            <SubscribeItem uuid={it.uploader.uuid} id={it.uploader.id}/>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className={styles.login}>
                                로그인후 이용가능합니다
                            </div>
                        }
                        </>
                        :
                        ""
                    }
                </div>
            </div>
        </div>
    )
}