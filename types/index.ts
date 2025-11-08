

export type ResType<T> =
    | {success:true,  data:T}
    | {success:false, data:string};


export interface steamDataType {
    appid:number,
    name:string,
    free:boolean,
    initialValue:number,
    finalValue:number,
    ccu:number,

    requireAge:number,
    category:string[],
    searchKey:string[],

    screenImgList:string[],
    descript:string,

    iconImg:string,
    shortDescript:string,

    pcRequire:string,
    macRequire:string,
    linuxRequire:string,

    creatData:string,
    editData:string,
}