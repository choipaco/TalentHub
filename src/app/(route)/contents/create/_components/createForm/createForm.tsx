import { useState, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import styles from './createForm.module.css';

interface CreateFormProps {
  video?: File;
  setVideo: Dispatch<SetStateAction<File | undefined>>;
  thumbnail?: File;
  setThumbnail: Dispatch<SetStateAction<File | undefined>>;
  setExplanation:Dispatch<SetStateAction<string>>;
  setTitle:Dispatch<SetStateAction<string>>;
}

const CreateForm = ({ video, setVideo, thumbnail, setThumbnail,setExplanation,setTitle }: CreateFormProps) => {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);


  const handleVideoUploadClick = () => {
    videoInputRef.current?.click();
  };

  const handleThumbnailUploadClick = () => {
    thumbnailInputRef.current?.click();
  };

  const onDropVideo = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setVideo(acceptedFiles[0]);
    }
  };

  const onDropThumbnail = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setThumbnail(acceptedFiles[0]);
    }
  };

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({ onDrop: onDropVideo });
  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({ onDrop: onDropThumbnail });

  return (
    <div className={styles.createContainer}>
      <div className={styles.formText}>
        <div className={styles.textContainers}>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>제목</div>
              <input type='text' className={styles.titleInput} onChange={(e)=>{
                setTitle(e.target.value);
              }}/>
            </div>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>설명</div>
              <textarea className={styles.titleInput2} onChange={(e)=>{
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
                이미지 파일을 업로드하세요.
              </label>
              <input {...getThumbnailInputProps()} ref={thumbnailInputRef} style={{ display: 'none' }} />
            </>
          )}
        </div>
      </div>
      <div>
        <div {...getVideoRootProps()} className={styles.dropzoneStyles}>
          {video ? (
            <div>{video.name}</div>
          ) : (
            <>
              <label className={styles.uploadLabel} onClick={handleVideoUploadClick}>
                <Image 
                  src="/assets/img/drop.svg"
                  alt="동영상 업로드"
                  width={40}
                  height={40}
                  className={styles.imageFileText}
                />
                동영상 파일을 업로드하세요.
              </label>
              <input {...getVideoInputProps()} ref={videoInputRef} style={{ display: 'none' }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
