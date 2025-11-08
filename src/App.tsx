import { useState,useRef, useEffect,memo } from 'react'
import './App.css'
// 轉換steam格式為html
import changeSteamString from './utils/changeSteamString'
// 讀取資料
import getSteamGameData from './server/getSteamData'
// 設定共用參數
import type {steamDataType} from '../types/index'

import style from './style/index.module.scss'

function App() {
  const [steamData, setSteamData] = useState<steamDataType[]>([])
  // 每次要求+10 用於壁免重覆抓取資料。
  const [limit,setLimit] = useState<number>(10);
  // 一來是觸發搜尋功能coldDown，二來是觸發memo刷新
  const [moreDataLoading, setMoreDataLoading] = useState<boolean>(false);
  const [loading , setLoading] = useState<boolean>(true);
  
  useEffect(()=>{
    // setDataString(changeSteamString(dataString))
    console.log('進行初始化');
    const getFirstData = async() =>{
      if(moreDataLoading)return;
      setMoreDataLoading(true);
      console.log("進行呼叫")
      try{
        const getData = await getSteamGameData();
        if(getData.success === true){
          console.log('進行資料追加')
          console.log(steamData.length)
          if(steamData.length > 0){
            console.log("目前steamData有資料")
            if(getData.data[0].appid === steamData[limit-10].appid)return;
          }
          setSteamData(index=>{
            return[
              ...index,
              ...getData.data
            ]
          })
        }
        console.log(getData);
      }catch(e){
        console.error("error:",e);
      }
      setMoreDataLoading(false);
    }

    if(loading){
      setLoading(false);
      getFirstData();
    }
    
  },[])


  const DataShow = memo(({loading}:{loading:Boolean})=>{
    console.log("觸發memo刷新")
    console.log("當前loading為",loading)
    if(loading){
      return(
        <section className={style.gameCardDiv}>
          {steamData.map((index:steamDataType,key:number)=>{
          return(
            <div className={style.gameCard} key={`${index.appid}-${index.name}-${key}`}>
              <img  src={index.iconImg} alt={`${index.name}-icon`} loading='lazy'></img>
              <p>{index.name}</p>
              <div className={style.gameContext}>
                {index.free? <p>免費</p>
                : index.finalValue === 0 && index.initialValue === 0?<p>售價:暫無資料</p> 
                : index.finalValue === 0? <p>限時特價</p> 
                : index.finalValue === index.initialValue ? <p>價格:{index.initialValue}</p>
                :<><p>當前{index.initialValue}元</p> <p>特價:{index.finalValue}</p></>}
              </div>
            </div>
          )
        })}
          <div>
            loading...
          </div>
        </section>
      )
    }
    return(
      <section className={style.gameCardDiv}>
        {steamData.map((index:steamDataType,key:number)=>{
          return(
            <div className={style.gameCard} key={`${index.appid}-${index.name}-${key}`}>
              <img  src={index.iconImg} alt={`${index.name}-icon`} loading='lazy'></img>
              <p>{index.name}</p>
              <div className={style.gameContext}>
                {index.free? <p>免費</p>
                : index.finalValue === 0 && index.initialValue === 0?<p>售價:暫無資料</p> 
                : index.finalValue === 0? <p>限時特價</p> 
                : index.finalValue === index.initialValue ? <p>價格:{index.initialValue}</p>
                :<><p>當前{index.initialValue}元</p> <p>特價:{index.finalValue}</p></>}
              </div>
            </div>
          )
        })}
        <div>
          loading complate
        </div>
      </section>
    )
  })
  return (
    <>
      <main className={style.main}>
        <article className={style.gameListDiv}>
          <header>
            <h2>熱門遊戲</h2>
          </header>
          <DataShow loading={moreDataLoading}/>
        </article>
      </main>
    </>
  )
}

export default App
