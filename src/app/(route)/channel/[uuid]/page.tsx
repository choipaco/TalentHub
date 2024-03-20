'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "../../../_components/sidebar/sidebar";
import VideoList from "./_components/videoList/videoList";
import { useState,useEffect } from "react";
import {otherProfileApi, profileApi} from "../../../_service/auth";
import { useParams } from "next/navigation";

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
export default function Home() {
  const params = useParams<{ uuid: string}>().uuid
  const [data, setData] = useState<User>();
  const search = async() =>{
    setData(await otherProfileApi(params));
  }
  useEffect(()=>{
    search()
  },[])

  useEffect(()=>{
  },[data])
  return (
  <main className={styles.main}>
    <Sidebar />
      <h1 className={styles.title}>{data?.id} 님의 채널 콘텐츠</h1>
    <div className={styles.videoListContainer}>
    <VideoList Search={data}/>
    </div>
  </main>
  );
}
