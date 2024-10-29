import './assets/scss/all.scss';
// import 'bootstrap/dist/js/bootstrap.min.js';
import { Modal } from 'bootstrap';

console.log("Hello world!");

// 登入功能
const loginForm = document.getElementById('loginForm');
const logoutForm = document.getElementById('logoutForm');
const errorMessage1 = document.getElementById('errorMessage1');
const errorMessage2 = document.getElementById('errorMessage2');
const navbarLog1 = document.getElementById('navbar-log1');
const navbarLog2 = document.getElementById('navbar-log2');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("我有點到!");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 隱藏錯誤訊息初始設置
    errorMessage1.style.display = 'none';
    errorMessage2.style.display = 'none';

    // 驗證帳號密碼
    if (email === "" || password === "") {
        console.log("我是空的");
        errorMessage1.style.display = 'block';
    } else if (email === '123@123' && password === '123') {
        console.log("我是對的!!!");
        // 登入成功，變更頭像
        navbarLog1.style.display = 'none';
        navbarLog2.style.display = 'block';
        
        // 隱藏彈出視窗
        const loginModalInstance = Modal.getInstance(document.getElementById("login-modal"));
        loginModalInstance.hide();
    } else {
        // 顯示錯誤訊息
        errorMessage2.style.display = 'block';
        console.log("我是錯的!!!");
    }});

logoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    
        navbarLog1.style.display = 'block';
        navbarLog2.style.display = 'none';
        const loginModalInstance = Modal.getInstance(document.getElementById("logout-modal"));
        loginModalInstance.hide();
        
        
    });