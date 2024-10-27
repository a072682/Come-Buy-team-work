

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

      const message = document.getElementById('message');
      const charCounter = document.getElementById('result');
      const submitBtn = document.getElementById('submitBtn');
      const resultModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    
      // 監聽輸入框的輸入事件，更新字數計數
      message.addEventListener('input', function() {
        console.log("我在打字");
        const currentLength = message.value.length;
        charCounter.textContent = `${currentLength}/500`;
      });
    
      // 當按下回報按鈕時，顯示 Modal 視窗並清空輸入框
      submitBtn.addEventListener('click', function() {
        resultModal.show();  // 顯示 Modal
      });
    
      // 點擊 Modal 視窗後，隱藏並清空輸入框
      document.getElementById('exampleModal').addEventListener('click', function() {
        resultModal.hide();  // 隱藏 Modal
        message.value = '';  // 清空輸入框
        charCounter.textContent = '0/500';  // 重設字數計數
      });