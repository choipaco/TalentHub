'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Sidebar from "@/app/_components/sidebar/sidebar";
import createContentApi, { inforApi, updateContentApi } from "@/app/_service/content";
import CreateForm from "./_components/createForm/createForm";
interface SearchResponse {
  success: boolean;
  message: string;
  search: {
      uuid: string;
      thumbnail: string;
      video: string;
      title: string;
      explanation: string;
      views: number;
      createdAt: string;
      user: {
          uuid: string;
          id: string;
      };
  };
}
export default function Home() {
  const [data, setData] = useState<SearchResponse>();
  const params = useSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();
  const getInfo = async () => {
    const uuid = params.get('uuid') ? params.get('uuid') : '';
    setData(await inforApi(uuid ? uuid : ''));
  }
  useEffect(()=>{
    getInfo()
  },[])

  useEffect(()=>{
    if(!data) return
    setTitle(data.search.title);
    setExplanation(data.search.explanation);
  },[data])


useEffect(()=>{
  if(!thumbnail?.type.includes('image')){
      setThumbnail(undefined);
    }
  },[thumbnail])

  const api  = async() => {
    const formData = new FormData();
    const uuid = params.get('uuid') ? params.get('uuid') : '';
    formData.append('uuid',uuid ? uuid : '')
    formData.append('image',thumbnail ? thumbnail : '')
    formData.append('title',title)
    formData.append('explanation',explanation)

    const success = await updateContentApi(formData);

    if(success){
      alert('콘텐츠가 업데이트 되었습니다');
      router.push('/');
    }
  }

  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.createContainer}>
       <CreateForm title={title} explanation={explanation} setThumbnail={setThumbnail} setExplanation={setExplanation} setTitle={setTitle} thumbnail={thumbnail} />
       <div className={styles.create} onClick={api}>
        수정하기
       </div>
      </div>
    </main>
  );
}

const dropzoneStyles: React.CSSProperties = {
  
};
