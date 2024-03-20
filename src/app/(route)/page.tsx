'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "../_components/sidebar/sidebar";
import VideoList from "./_components/videoList/videoList";
import { useState,useEffect } from "react";
import {SearchApi} from "../_service/content";
import { useSearchParams } from "next/navigation";
import SubscribeList from "./_components/subscribeList/subscribeList";
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
export default function Home() {
  const [data, setData] = useState<SearchResult>();
  const params = useSearchParams();
  const search = async() =>{
    const search = params.get('search');
    if(!search){
      setData(await SearchApi(''));

    }else{
      setData(await SearchApi(search));
    }
  }
  useEffect(()=>{
    search()
  },[params])
  return (
  <main className={styles.main}>
    <Sidebar />
    <div className={styles.subscribeList}>
      <SubscribeList/>
    </div>
    <div className={styles.videoListContainer}>
    <VideoList Search={data}/>
    </div>
  </main>
  );
}
