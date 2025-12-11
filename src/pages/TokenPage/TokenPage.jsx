import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TokenPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("value");

    if (token) {
      localStorage.setItem("user_token", token);
    }

    // 1. 存完 token 後馬上跳回首頁
    navigate("/", { replace: true });
    //replace: true 的效果是 即便按上一頁 也回不到帶有token網址的頁面 會被"/"取代
  }, []);

  return (
    <div>登入中...</div>
  )
}
