import { useState, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import styles from './createForm.module.css';

interface CreateFormProps {
  thumbnail?: File;
  title:string,
  explanation:string,
  setThumbnail: Dispatch<SetStateAction<File | undefined>>;
  setExplanation:Dispatch<SetStateAction<string>>;
  setTitle:Dispatch<SetStateAction<string>>;
}

const CreateForm = ({thumbnail,title,explanation, setThumbnail,setExplanation,setTitle }: CreateFormProps) => {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailUploadClick = () => {
    thumbnailInputRef.current?.click();
  };



  const onDropThumbnail = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setThumbnail(acceptedFiles[0]);
    }
  };

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({ onDrop: onDropThumbnail });

  return (
    <div className={styles.createContainer}>
      <div className={styles.formText}>
        <div className={styles.textContainers}>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>제목</div>
              <input type='text' className={styles.titleInput} 
              value={title}
              onChange={(e)=>{
                setTitle(e.target.value);
              }}/>
            </div>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>설명</div>
              <textarea className={styles.titleInput2} 
              value={explanation}
              onChange={(e)=>{
                setExplanation(e.target.value);
              }}/>
            </div>
          </div>
        </div>
        <div {...getThumbnailRootProps()} className={styles.dropzoneStyles}>
          {thumbnail ? (
            <div>{thumbnail.name}</div>
          ) : (
            <>
              <label className={styles.uploadLabel} onClick={handleThumbnailUploadClick}>
                <Image 
                  src="/assets/img/drop.svg"
                  alt="이미지 업로드"
                  width={40}
                  height={40}
                  className={styles.imageFileText}
                />
                이미지 파일을 업로드하세요.<br/>(이미지를 업로드 안 할시 전에 썸네일을 적용합니다)
              </label>
              <input {...getThumbnailInputProps()} ref={thumbnailInputRef} style={{ display: 'none' }} />
            </>
          )}
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default CreateForm;
