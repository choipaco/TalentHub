import axiosInstance from "@/utils/axios";
import axios from "axios";


export default async function createContentApi(formData:FormData){
    try{
        const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/contents/create`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
              },
        })

        if(res.data.success){
            return true
        }
    }catch (error:any) {
        alert(error.response.data.message);
    }
}

export async function SearchApi(search:string) {
    
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/contents/search?s=${search}`);
        
        return res.data;
    } catch (error:any) {
        alert(error.response.data.message);
    }
}

export async function updateContentApi(formData:FormData){
    try{
        const res = await axiosInstance.put(`${process.env.NEXT_PUBLIC_DB_LINK}/api/contents/update`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
              },
        })

        if(res.data.success){
            return true
        }
    }catch (error:any) {
        alert(error.response.data.message);
    }
}

export async function deleteContentApi(uuid?:string) {
    if(!uuid) return alert('uuid값을 입력하세요.')
    try{
        const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DB_LINK}/api/contents/delete/${uuid}`)
        alert(res.data.message)
    }catch (error:any) {
        alert(error.response.data.message);

        return false
    }
}

export const inforApi = async (uuid:string) =>{
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/contents/infor/${uuid}`);
        return res.data;
    } catch (error:any) {
        alert(error.response.data.message);
    }
}


export async function checkSub(uuid?:string){
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/subscribe/check?uuid=${uuid}`);

        if(res.data.success){
            return res.data.check;
        }
    } catch (error:any) {
        alert(error.response.data.message);
    }
}


export async function subOn(user_uuid?:string){
    try {
        const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/subscribe/on`,{
            user_uuid
        });

        if(res.data.success){
            return true;
        }
    } catch (error:any) {
    }
}


export async function subOff(uuid?:string){
    try {
        const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DB_LINK}/api/subscribe/off?uuid=${uuid}`);

        if(res.data.success){
            return true;
        }
    } catch (error:any) {
        alert(error.response.data.message);
    }
}

export async function subList(){
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/subscribe/list`);

        if(res.data.success){
            return res.data.list;
        }
    } catch (error:any) {
    }
}