import { db } from "../firebase/config";

import type { ResType ,steamDataType} from '../../types/index';
import { query, collection , orderBy,limit, getDocs } from "firebase/firestore";

export default async function getSteamGameData ():Promise< ResType<steamDataType[]> > {
    console.log("進行查詢");
    
    try{
        const q = query(
            collection(db,"steamGameData"),
            orderBy("ccu","desc"),
            limit(10));
        const dataAwait = await getDocs(q);
        const dataList:steamDataType[] = dataAwait.docs.map((rows:any)=>{
            const rowsData = rows.data();
            // return rowsData;
            return {
                ...rowsData,
                editData:rowsData.editData?.toDate() ?? "error"
            }
        })
        

        return {success:true,data:dataList}
    }catch(e){
        const msg : string = e instanceof Error ? e.message : String(e)
        return {success:false, data:msg}
    }
}