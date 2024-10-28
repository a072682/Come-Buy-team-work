import './assets/scss/all.scss';
// import 'bootstrap/dist/js/bootstrap.min.js';
import { Modal } from 'bootstrap';

console.log("Hello world!");

// 登入功能
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const profilePic = document.getElementById('aa');
console.log("測試一下");

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 驗證帳號密碼
    if (username === '123' && password === '123') {
        // 登入成功，變更頭像
        profilePic.src = 'https://fakeimg.pl/80x80/';  // 使用者頭像
        errorMessage.style.display = 'none';
        
        // 隱藏彈出視窗
        const loginModalInstance = Modal.getInstance(document.getElementById("bb"));
        
        
         loginModalInstance.hide();
        

    } else {
        // 顯示錯誤訊息
        errorMessage.style.display = 'block';
    }
});