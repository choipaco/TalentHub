import axiosInstance from "@/utils/axios";
import axios from "axios";

export default async function createCommentApi(content_uuid:string, comment:string) {
    if(!content_uuid) return alert("콘텐츠 uuid가 없습니다");
    if(!comment) return alert("댓글을 입력해주세요");
    
    try {
        const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/comment/create`, {
            content_uuid,
            comment
        });
        return res.data; 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}



export const getCommentsList = async(content_uuid:string) =>{
    if(!content_uuid) return alert("콘텐츠 uuid가 없습니다");

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/comment/get/list/${content_uuid}`);
        return res.data.comments;
    } catch (error:any) {
        alert(error.response.data.message);
    }
}



export async function updateCommentApi(uuid?:string, content_uuid?:string, comment?:string) {
    if(!uuid) return alert('댓글 uuid가 없습니다');
    if(!content_uuid) return alert("콘텐츠 uuid가 없습니다");
    if(!comment) return alert("댓글을 입력해주세요");
    
    try {
        const res = await axiosInstance.put(`${process.env.NEXT_PUBLIC_DB_LINK}/api/comment/modify`, {
            uuid,
            content_uuid,
            comment
        });
        return res.data.success; 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}

export async function deleteCommentApi(uuid?:string) {
    if(!uuid) return alert('댓글 uuid가 없습니다');
    try {
        const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DB_LINK}/api/comment/delete?uuid=${uuid}`);
        return res.data.success; 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}