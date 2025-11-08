import DOMPurify from "dompurify";

// 轉換steam格式 變成純html格式
export default function changeSteamString(inputStr:string):string{
    if (!inputStr) return "";
    inputStr = inputStr
      .replace(/\\u003C/g, "<")
      .replace(/\\u003E/g, ">")
      .replace(/\\u0026/g, "&")
      .replace(/\sclass="[^"]*"/g, "");
    // 回傳安全問題。
    return DOMPurify.sanitize(inputStr);

}