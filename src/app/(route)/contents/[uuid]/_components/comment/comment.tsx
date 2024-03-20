import timeAgo from "@/utils/time";
import styles from "./comment.module.css"
import { getCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import createCommentApi, { getCommentsList } from "@/app/_service/comments";
import CommentItem from "./commentItem/commentItem";

interface Comments {
    uuid: string,
    comment: string,
    createdAt: Date
    user: {
        uuid: string;
        id: string;
    };
}
export default function Comment(props: {uuid: string}){
    const [data, setData] = useState<Comments[]>();
    const [comment, setCommnet] = useState('');
    const [road, setRoad] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    useEffect(()=>{
        setRoad(true);
    },[])

    const getApi = async(uuid:string) =>{
        setData(await getCommentsList(uuid));
    }
    useEffect(()=>{
        if(props.uuid){
            getApi(props.uuid);
        }
    },[props.uuid])

    const commentSubmit = async() =>{
        await createCommentApi(props.uuid,comment);
        setCommnet('');
        setUpdateData(true);
    }

    useEffect(()=>{
        if(updateData){
            getApi(props.uuid);
            setUpdateData(false);
        }
    },[updateData])
    return(
        <div className={styles.comment}>
                    <div>댓글 {data?.length}개</div>
                    <div className={styles.commentInputContainer}>
                        <input 
                        type="text" 
                        className={styles.inputStyle}
                        placeholder="댓글추가..."
                        value={comment}
                        onChange={(e)=>{setCommnet(e.target.value)}}
                        />
                    </div>
                    <div className={styles.inputBtn}>
                            {
                                road ?
                                <label>
                                {
                                    getCookie('successLogin') ? 
                                    <button 
                                    className={styles.commentSubmitBtn}
                                    onClick={commentSubmit}
                                    disabled={comment.length === 0 ? true : false}
                                    >
                                    댓글
                                    </button>
                                    :
                                    <button className={styles.commentSubmitBtn}>
                                    로그인
                                    </button>
                                }
                                </label>
                                :
                                ""
                            }
                    </div>
                    <div className={styles.commentListContainer}>
                        {
                            data?.map((it)=>{
                                return(
                                    <CommentItem comment={it} content_uuid={props.uuid} setUpdateData={setUpdateData}/>
                                )
                            })
                        }
                    </div>
                </div>
    )
}   