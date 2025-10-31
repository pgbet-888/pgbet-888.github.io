(function() {
    'use strict';
    
    // Cookie functions
    function setCookie(name, value, hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Check if popup was already closed
    if (getCookie('popup_closed') === 'true') {
        return; // Don't show popup if cookie exists
    }
    
    // Inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        /* POP UP */
        #popup_overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        /* container 80% height */
        #popup_container {
            width: 90%;
            max-width: 600px;
            height: 80%;
            background: #111;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 0 25px rgba(255, 0, 0, 0.8);
            animation: containerGlow 2s infinite alternate;
        }
        /* header */
        #popup_header {
            background: #9a0f04;
            background-size: 400%;
            color: #fff;
            padding: 0 12px;
            font-size: 20px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #popup_header span {
            cursor: pointer;
            font-size: 2rem;
            font-weight: bold;
            transition: transform 0.3s;
        }
        #popup_header span:hover {
            transform: rotate(180deg);
        }
        /* scrollable content */
        #popup_content {
            flex: 1;
            overflow-y: auto;
            padding: 18px;
            text-align: center;
        }
        /* text styles */
        #popup_content p {
            margin: 8px 0;
            font-size: 18px;
            font-weight: 600;
            animation: flashColor 2s infinite linear;
        }
        /* make every odd/even paragraph flash differently */
        #popup_content p:nth-child(odd) {
            animation: flashColor 1.2s infinite alternate;
        }
        #popup_content p:nth-child(even) {
            animation: flashColorAlt 1.5s infinite alternate;
        }
        #popup_content img {
            max-width: 100%;
            border-radius: 8px;
            margin-bottom: 12px;
            box-shadow: 0 0 10px #fff;
            animation: pulseImg 2s infinite ease-in-out;
        }
        .btn-popup-footer {
            color: #fff;
            background: #9a0f04;
            border-width: 0px;
            border-style: initial;
            border-color: initial;
            border-image: initial;
            min-width: 100px;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.42857;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            padding: 6px 12px;
            white-space: nowrap;
            border-radius: 4px;
        }
        /* ANIMATIONS */
        @keyframes flashColor {
            0% { color: #ff0000; }
            20% { color: #ff7300; }
            40% { color: #ffeb00; }
            60% { color: #47ff00; }
            80% { color: #00ffee; }
            100% { color: #ff00e0; }
        }
        @keyframes flashColorAlt {
            0% { color: #00ffee; }
            25% { color: #2b65ff; }
            50% { color: #ff00e0; }
            75% { color: #ffeb00; }
            100% { color: #ff0000; }
        }
        @keyframes pulseImg {
            0%, 100% { transform: scale(1); box-shadow: 0 0 10px #fff; }
            50% { transform: scale(1.05); box-shadow: 0 0 25px #ff00ff; }
        }
        @keyframes containerGlow {
            0% { box-shadow: 0 0 20px #ff0000; }
            50% { box-shadow: 0 0 30px #00ffea; }
            100% { box-shadow: 0 0 20px #ff00ff; }
        }
    `;
    document.head.appendChild(style);
    
    // Create HTML structure
    const popupHTML = `
        <div id="popup_overlay">
            <div id="popup_container">
                <div id="popup_header">
                    <div>ข้อตกลงของการใช้งาน</div>
                    <p><span class="btn-popup-close" id="popup_close">×</span></p>
                </div>
                <div id="popup_content">
                    <a href="https://pgbet888.vip/apps-pgbet888" target="_blank" rel="noopener">
                        <br />
                        <img decoding="async" src="https://ik.imagekit.io/m3zly21z7h/pgbet888/pgbet888-warp-vpn.jpg" alt="banner-pgbet888" class="resized-image" /><br />
                    </a>
                    <p></p>
                    <p>DOWNLOAD</p>
                    <p>WARP 1.1.1.1</p>
                    <div class="app-images">
                        <a href="https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone" target="_blank" rel="noopener">
                            <br />
                            <img decoding="async" src="https://ik.imagekit.io/m3zly21z7h/pgbet888/logo_google_play.png" alt="apk-vpn" /><br />
                        </a>
                        <br />
                        <a href="https://apps.apple.com/id/app/1-1-1-1-faster-internet/id1423538627" target="_blank" rel="noopener">
                            <br />
                            <img decoding="async" src="https://ik.imagekit.io/m3zly21z7h/pgbet888/logo_ios.png" alt="apk-vpn" /><br />
                        </a>
                    </div>
                    <hr style="border: 1px solid white; margin-top: 20px; margin-bottom: 20px;" />
                    <p>ระวังการหลอกลวงที่อ้างชื่อเว็บไซต์ PGBET888</p>
                    <p>กรุณายืนยันการฝากและถอนผ่าน LINE</p>
                    <p>ลิงก์ LINE</p>
                    <p>
                        <a href="https://pgbet888.vip/apps-pgbet888" target="_blank" rel="noopener">
                            <br />
                            <img decoding="async" src="https://ik.imagekit.io/m3zly21z7h/pgbet888/line_logo_pgbet888.png" alt="line-qr" /><br />
                        </a>
                    </p>
                    <p>คลิกลิงก์ APK PGBET888 ด้านล่าง</p>
                    <p><!-- Gambar bersebelahan dan tengah --></p>
                    <div class="app-images">
                        <a href="https://pgbet888.vip/apps-pgbet888" target="_blank" rel="noopener">
                            <br />
                            <img decoding="async" src="https://ik.imagekit.io/m3zly21z7h/pgbet888/logo_google_play.png" alt="apk-pgbet888" /><br />
                        </a>
                        <br />
                        <a href="https://pgbet888.vip/apps-pgbet888" target="_blank" rel="noopener">
                            <br />
                            <img decoding="async" src="https://ik.imagekit.io/m3zly21z7h/pgbet888/logo_ios.png" alt="apk-pgbet888" /><br />
                        </a>
                    </div>
                    <p><!-- Garis horizontal putih lagi --></p>
                    <hr style="border: 1px solid white; margin-top: 20px; margin-bottom: 20px;" />

                    <button class="btn-popup-footer btn-popup-close">Close</button>
                </div>
                <p></p>
            </div>
        </div>
    `;
    
    // Inject HTML into the document body when DOM is ready
    function initPopup() {
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Add event listener for close button
        const popupCloses = document.querySelectorAll('.btn-popup-close');
        popupCloses.forEach(popupClose => {
            popupClose.addEventListener('click', function() {
                document.querySelector('#popup_overlay').style.display = 'none';
                // Set cookie to expire in 12 hours
                setCookie('popup_closed', 'true', 12);
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPopup);
    } else {
        // DOM is already loaded
        initPopup();
    }
})();

