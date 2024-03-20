'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState,useEffect } from "react";
import {  useParams } from 'next/navigation'
import Sidebar from "@/app/_components/sidebar/sidebar";
import Video from "./_components/video/video";
import List from "./_components/list/list";



export default function Home() {
  const params = useParams<{ uuid: string}>().uuid
  
  return (
    <main className={styles.main}>
      <Sidebar/>
      <div className={styles.container}>
        <Video uuid={params}/>
      </div>
      <div className={styles.list}>
        <List uuid={params}/>
      </div>
    </main>
  );
}
