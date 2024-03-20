'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import Sidebar from "@/app/_components/sidebar/sidebar";
import createContentApi, { inforApi } from "@/app/_service/content";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import CreateForm from "./_components/createForm/createForm";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [video, setVideo] = useState<File>();
  const [thumbnail, setThumbnail] = useState<File>();

  useEffect(()=>{
    if(!video?.type.includes('video')){
    setVideo(undefined);
  }
},[video])

useEffect(()=>{
  if(!thumbnail?.type.includes('image')){
      setThumbnail(undefined);
    }
  },[thumbnail])

  const api  = async() => {
    const formData = new FormData();
    formData.append('image',thumbnail ? thumbnail : '')
    formData.append('video',video ? video : '')
    formData.append('title',title)
    formData.append('explanation',explanation)

    const success = await createContentApi(formData);

    if(success){
      alert('콘텐츠가 업로드 되었습니다');
      router.push('/');
    }
  }
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.createContainer}>
       <CreateForm setVideo={setVideo} setThumbnail={setThumbnail} setExplanation={setExplanation} setTitle={setTitle} thumbnail={thumbnail} video={video} />
       <div className={styles.create} onClick={api}>
        만들기
       </div>
      </div>
    </main>
  );
}

const dropzoneStyles: React.CSSProperties = {
  
};
