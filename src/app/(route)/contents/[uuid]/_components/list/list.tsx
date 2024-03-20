import { useEffect, useState } from 'react';
import styles from './list.module.css'
import { SearchApi } from '@/app/_service/content';
import ListItem from '../listItem/listItem';
interface SearchResult {
    success: boolean;
    message: string;
    search: SearchItem[] | undefined;
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

const List = (props:{uuid:string}) => {
    const [data, setData] = useState<SearchResult>();
    const [chk, setChk] = useState(false);  
    const getList = async() => {
        setData(await SearchApi(''));
        setChk(true);
    }

    useEffect(()=>{
        getList()
    },[])

    useEffect(()=>{
        if(chk){
            setData(prevData => {
                if (prevData) {
                  return {
                    ...prevData,
                    search: prevData.search ? prevData.search.filter(it => it.uuid !== props.uuid) : []
                  };
                }
                return prevData;
              });
        }
    },[chk])

    return(
        <div className={styles.main}>
            {
                data?.search?.map((it)=>{
                    return(
                        <ListItem data={it}/>
                    )
                })
            }
        </div>
    )
}

export default List;