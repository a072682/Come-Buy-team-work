import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TokenPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash; 
    //類似 "#/token?value=123&role=user"
    const queryString = hash.split("?")[1];
    //只要 ? 後面的部分
    // "value=123&role=user"
    const params = new URLSearchParams(queryString);
    //對"value=123&role=user"做解析這樣.get才能取出數值
    const token = params.get("value");
    if(token){
        localStorage.setItem("token", token);
        navigate("/", { replace: true });
        //replace: true 的效果是 即便按上一頁 也回不到帶有token網址的頁面 會被"/"取代
    }
  }, []);

  return (
    <div>登入中...</div>
  )
}
