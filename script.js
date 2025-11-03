(function() {
    'use strict';

    const startPopup = () => {
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
            .app-images {
                display: flex;
                justify-content: center;
                gap: 1rem;
            }
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
            #popup_overlay * {
                font-family: Prompt, sans-serif !important;
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
                padding: 10px 12px;
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
                            <a href="https://pgbet888.vip/line-pgbet888" target="_blank" rel="noopener">
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
    }
    
    const startFloatingButton = () => {
        // ====== CONFIG (boleh diubah) ======
        const ROOT_ID = 'ard-sosmed-root';
        const OPEN_BY_DEFAULT = false; // true = mulai terbuka
    
        // Stop kalau sudah terpasang
        if (document.getElementById(ROOT_ID)) return;
    
        // ====== CSS ======
        const css = `
        :root { --accent-color: #ffcc00; }
    
        .ard-sosmed {
            display:block; cursor:pointer; position:fixed; bottom:15%; right:10px;
            font-family:"Raleway",sans-serif; z-index:79;
        }
        .ard-sosmed ul { 
            margin:0; 
            padding:0;
            position: fixed;
            bottom: 22rem; 
        }
        .ard-sosmed.open ul {
            bottom: 12rem; 
        }
        .ard-sosmed ul li {
            position:absolute; text-decoration:none; list-style:none;
            transform:translate(0,0) rotate(360deg);
            transition:all .5s ease; opacity:0;
        }
    
        .ard-sosmed.open ul li:nth-child(1) { transform:translateY(-385px); transition-delay:.20s; opacity:1; }
        .ard-sosmed.open ul li:nth-child(2) { transform:translate(0,-310px); transition-delay:.16s; opacity:1; }
        .ard-sosmed.open ul li:nth-child(3) { transform:translate(0,-235px); transition-delay:.12s; opacity:1; }
        .ard-sosmed.open ul li:nth-child(4) { transform:translate(0,-160px); transition-delay:.08s; opacity:1; }
        .ard-sosmed.open ul li:nth-child(5) { transform:translate(0,-85px);  transition-delay:.04s; opacity:1; }
        .ard-sosmed.open ul li:nth-child(6) { transform:translateX(200px);   transition-delay:0s;   opacity:1; }
    
        .ard-sosmed ul li a { display:flex; width:80px; height:80px; border-radius:10px; justify-content:center; align-items:center; }
        .ard-sosmed ul li a img { width:99.5%; height:auto; }
    
        .hamburg { 
            width:80px; 
            height:80px; 
            display:flex; 
            flex-direction:column; 
            justify-content:center; 
            align-items:center; 
            border: none;
            background: none;
            cursor: pointer;
        }
        .bar1,.bar2,.bar3 {
            width:80%; height:5px; background-color:var(--accent-color);
            margin:6px auto; transition:.4s; position:relative; transform:translateY(-1px);
        }
        .ard-sosmed.open .bar1 { transform:translate(0,10px) rotate(-225deg); }
        .ard-sosmed.open .bar2 { opacity:0; transform:translate(0,-6px) rotate(-225deg); }
        .ard-sosmed.open .bar3 { transform:translate(0,-12px) rotate(-315deg); }
    
        .attention { position:absolute; top:-32px; left:0; font-weight:700; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.5); }
        .attention.whore { opacity:1; transition:opacity .3s; }
        .ard-sosmed.open .attention.whore { opacity:0; }
    
        .ard-sosmed ul li div {
            position:absolute; transition:all .3s ease; opacity:0; scale:.1;
            right: 5rem;
            font-family:"Raleway",sans-serif; font-size:large; background:rgba(0,0,0,1);
            color:var(--accent-color); text-align:center; white-space:nowrap; padding:4px 8px; border-radius:6px;
        }
        .ard-sosmed ul li:hover div { 
            opacity:1; scale:1;
        }
    
        /* Tooltip posisi */
        .ard-sosmed ul li:nth-child(1) div { transform:translateY(-240px); }
        .ard-sosmed ul li:nth-child(1):hover div { transform:translateY(-95px); }
    
        .ard-sosmed ul li:nth-child(2) div { transform:translateY(-175px); }
        .ard-sosmed ul li:nth-child(2):hover div { transform:translate(30px,-95px); }
    
        .ard-sosmed ul li:nth-child(3) div { transform:translateY(-150px); }
        .ard-sosmed ul li:nth-child(3):hover div { transform:translate(50px,-90px); }
    
        .ard-sosmed ul li:nth-child(4) div { transform:translateX(160px); }
        .ard-sosmed ul li:nth-child(4):hover div { transform:translate(50px,-90px); }
    
        .ard-sosmed ul li:nth-child(5) div { transform:translate(110px,70px); }
        .ard-sosmed ul li:nth-child(5):hover div { transform:translate(62px,-80px); }
    
        .ard-sosmed ul li:nth-child(6) div { transform:translate(55px,135px); }
        .ard-sosmed ul li:nth-child(6):hover div { transform:translate(65px,-65px); }
    
        @media screen and (max-width:600px){
            .ard-sosmed{ 
                bottom:8rem;
                right: 1.15rem;
            }
            .attention {
                top: -3rem;
                left: 20%;
            }
            .hamburg {
                width: 50px;
                height: 50px;
            }
            .ard-sosmed.open ul {
                bottom: 8.2rem;
            }
            .ard-sosmed ul {
                right: 5.8rem;
                bottom: 5rem;
            }
            .ard-sosmed ul li a img {
                width: 100%;
            }
        }`;
    
        const style2 = document.createElement('style');
        style2.textContent = css;
        document.head.appendChild(style2);
    
        // ====== HTML ======
        const container = document.createElement('div');
        container.id = ROOT_ID;
        container.innerHTML = `
            <div class="ard-sosmed${OPEN_BY_DEFAULT ? ' open' : ''}">
            <button class="hamburg" type="button" aria-label="Toggle quick links">
                <img src="https://s3.cdn-thai.com/pgbet888/floating-button-ms/main-resize.gif" alt="Hamburg Icon" width="88" height="88">
            </button>
            <ul aria-label="Quick links">
                <li>
                    <a href="https://pgbet888.vip/vpn-download" target="_blank" rel="noopener">
                        <img src="https://s3.cdn-thai.com/pgbet888/floating-button-ms/vpn-resize.gif" alt="VPN">
                    </a>
                    <div>VPN</div>
                </li>
                <li>
                    <a href="https://pgbet888.vip/apps-pgbet888" target="_blank" rel="noopener">
                        <img src="https://s3.cdn-thai.com/pgbet888/floating-button-ms/android-resize.gif" alt="ANDROID">
                    </a>
                    <div>ANDROID</div>
                </li>
                <li>
                    <a href="https://pgbet888.vip/apps-pgbet888" target="_blank" rel="noopener">
                        <img src="https://s3.cdn-thai.com/pgbet888/floating-button-ms/ios-resize.gif" alt="IOS">
                    </a>
                    <div>IOS</div>
                </li>
                <li>
                    <a href="https://pgbet888.vip/line-pgbet888" target="_blank" rel="noopener">
                        <img src="https://s3.cdn-thai.com/pgbet888/floating-button-ms/line-resize.gif" alt="Line">
                    </a>
                    <div>LINE</div>
                </li>
            </ul>
            </div>
        `;
        document.body.appendChild(container);
    
        // ====== Interaksi ======
        const root = container.querySelector('.ard-sosmed');
        const toggleBtn = container.querySelector('.hamburg');
        const attention = container.querySelector('.attention.whore');
    
        function toggleOpen() {
            root.classList.toggle('open');
            attention?.classList.remove('whore');
        }
    
        // click / keyboard
        toggleBtn.addEventListener('click', toggleOpen);
        toggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); }
        });
    }

    startPopup();
    // startFloatingButton();
})();

