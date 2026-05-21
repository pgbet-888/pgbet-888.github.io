(function () {
    'use strict';

    const CONFIG = {
        paths: ['/'],
        delayShow: 1000,
        /** Path to WebP logo (relative to page or absolute URL) */
        logoUrl: 'assets/pgbet888-logo.webp',
        bannerUrl: 'assets/pgbet888_ms_21052026.webp', // Banner Image
        links: {
            line: 'https://t.ly/savage888line'
        },
        // Master Programmer Enhancements:
        frequency: 'every-load', // Options: 'every-load', 'once-per-session', 'once-per-day'
        debugMode: false,              // Set to true to force show on local development
        officialDomain: 'https://t.ly/savage888'
    };

    function shouldRun() {
        if (CONFIG.debugMode) return true;

        // Path checking
        const isMatchedPath = (!CONFIG.paths || CONFIG.paths.length === 0) || (CONFIG.paths.indexOf(window.location.pathname) !== -1);
        if (!isMatchedPath) return false;

        // Smart Frequency Capping
        if (CONFIG.frequency === 'once-per-session') {
            if (sessionStorage.getItem('pgx_popup_shown')) return false;
        } else if (CONFIG.frequency === 'once-per-day') {
            const lastShown = localStorage.getItem('pgx_popup_last_shown');
            if (lastShown) {
                const diff = Date.now() - parseInt(lastShown, 10);
                if (diff < 24 * 60 * 60 * 1000) return false; // 24 Hours
            }
        }
        return true;
    }

    function closePopup() {
        const el = document.getElementById('pgx_final_overlay');
        if (el) {
            el.style.opacity = '0';
            const inner = el.querySelector('#pgx_final_container');
            if (inner) {
                inner.style.transform = 'perspective(1000px) rotateX(12deg) scale(0.9) translateY(40px)';
                inner.style.filter = 'blur(4px)';
            }

            setTimeout(function () {
                el.remove();

                // Pure DOM: Clean up dynamic style tags to maintain document hygiene
                const style = document.getElementById('pgx_final_styles');
                if (style) style.remove();

                // Accessibility: Return focus to previous active element
                if (window.pgx_prev_active_element && typeof window.pgx_prev_active_element.focus === 'function') {
                    window.pgx_prev_active_element.focus();
                }
            }, 300);
        }
    }

    const startPopup = function () {
        if (document.getElementById('pgx_final_overlay')) return;

        // Save active element for accessibility focus restoration
        window.pgx_prev_active_element = document.activeElement;

        const L = CONFIG.links;

        // --- CSS INJECTION ---
        const style = document.createElement('style');
        style.id = 'pgx_final_styles';
        style.textContent = `
            @keyframes pgxFinalFadeIn {
                from { opacity: 0; backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); }
                to { opacity: 1; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
            }
            @keyframes pgxFinal3DEntrance {
                0% {
                    opacity: 0;
                    transform: perspective(1000px) rotateX(12deg) scale(0.9) translateY(40px);
                    filter: blur(4px);
                }
                100% {
                    opacity: 1;
                    transform: perspective(1000px) rotateX(0deg) scale(1) translateY(0);
                    filter: blur(0px);
                }
            }
            @keyframes pgxShineSweep {
                0% { left: -150%; }
                50% { left: 150%; }
                100% { left: 150%; }
            }
            @keyframes pgxShieldPulse {
                0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(209, 171, 102, 0.4)); }
                50% { transform: scale(1.08); filter: drop-shadow(0 0 10px rgba(209, 171, 102, 0.8)); }
            }

            #pgx_final_overlay {
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px 15px;
                background: rgba(10, 6, 4, 0.75);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                font-family: 'Leelawadee UI', 'Noto Sans Thai', 'Segoe UI', Tahoma, sans-serif;
                animation: pgxFinalFadeIn 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
                transition: opacity 0.3s ease;
            }
            #pgx_final_overlay * { box-sizing: border-box; outline: none; }
            
            #pgx_final_container {
                position: relative;
                width: 100%;
                max-width: 370px;
                background: linear-gradient(135deg, rgba(26, 17, 14, 0.96) 0%, rgba(12, 8, 6, 0.98) 100%);
                border-radius: 20px;
                border: 1px solid rgba(209, 171, 102, 0.32); 
                animation: pgxFinal3DEntrance 0.5s cubic-bezier(0.25, 1, 0.2, 1.1) forwards;
                box-shadow: 
                    0 25px 60px rgba(0, 0, 0, 0.85), 
                    0 0 25px rgba(209, 171, 102, 0.15),
                    inset 0 1px 1px rgba(255, 255, 255, 0.05); 
                overflow: hidden;
                transform-style: preserve-3d;
                will-change: transform;
            }

            /* Custom mouse spotlight tracker glow */
            #pgx_glow_effect {
                position: absolute;
                inset: 0;
                pointer-events: none;
                background: radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(209, 171, 102, 0.09), transparent 80%);
                transition: background 0.15s ease;
                z-index: 1;
            }

            #pgx_final_close {
                position: absolute;
                top: 15px;
                right: 18px;
                width: 32px;
                height: 32px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(209, 171, 102, 0.2);
                border-radius: 50%;
                color: #c9b088;
                font-size: 20px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            #pgx_final_close:hover { 
                transform: rotate(90deg) scale(1.08); 
                color: #fff; 
                border-color: rgba(209, 171, 102, 0.6);
                box-shadow: 0 0 10px rgba(209, 171, 102, 0.3);
            }
            #pgx_final_close:focus-visible {
                border-color: #d1ab66;
                box-shadow: 0 0 0 2px rgba(209, 171, 102, 0.4);
            }
            
            .pgx-header {
                width: 100%;
                text-align: center;
                padding: 24px 20px 18px;
                border-bottom: 1px solid rgba(209, 171, 102, 0.12);
                position: relative;
                z-index: 2;
            }
            .pgx-header-logo {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .pgx-header-logo img {
                max-width: min(240px, 85%);
                width: auto;
                height: auto;
                max-height: 52px;
                object-fit: contain;
                display: block;
                filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
            }
            .pgx-content-heading {
                margin: 0 0 16px;
                padding: 0;
                font-size: 18px;
                font-weight: 800;
                letter-spacing: 0.05em;
                line-height: 1.35;
                text-align: center;
                color: #d1ab66;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                position: relative;
                z-index: 2;
            }
            
            #pgx_final_content {
                padding: 18px 20px 24px;
                position: relative;
                z-index: 2;
            }

            /* Banner Wrapper and interactive styling */
            .pgx-banner-wrapper {
                width: 100%;
                margin-bottom: 15px;
                border-radius: 14px;
                overflow: hidden;
                border: 1px solid rgba(209, 171, 102, 0.25);
                box-shadow: 
                    0 8px 20px rgba(0, 0, 0, 0.55), 
                    inset 0 1px 0 rgba(255, 255, 255, 0.05);
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            .pgx-banner-wrapper:hover {
                border-color: rgba(209, 171, 102, 0.65);
                box-shadow: 0 10px 25px rgba(209, 171, 102, 0.25);
                transform: translateY(-2px);
            }
            .pgx-banner-wrapper a {
                display: block;
                width: 100%;
                height: 100%;
            }
            .pgx-banner-wrapper img {
                width: 100%;
                height: auto;
                display: block;
                object-fit: cover;
                transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            .pgx-banner-wrapper:hover img {
                transform: scale(1.04);
            }

            .pgx-btn-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .pgx-btn {
                position: relative;
                display: flex;
                align-items: center;
                text-decoration: none;
                padding: 13px 18px;
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                border: 1px solid rgba(255, 255, 255, 0.05);
                background: rgba(255, 255, 255, 0.02);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
            .pgx-btn:hover { 
                transform: translateY(-3px) scale(1.01);
                border-color: rgba(255, 255, 255, 0.15);
            }
            .pgx-btn:active { transform: translateY(-1px); }
            
            /* Glass Shine sweep on hover */
            .pgx-btn::before {
                content: '';
                position: absolute;
                top: 0; left: -150%;
                width: 100%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
                transform: skewX(-20deg);
                transition: left 0.6s ease;
                z-index: 2;
            }
            .pgx-btn:hover::before {
                left: 150%;
            }

            .pgx-btn-icon-wrapper {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.08);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
            }
            .pgx-btn:hover .pgx-btn-icon-wrapper {
                transform: scale(1.08) rotate(3deg);
            }
            .pgx-btn-svg {
                width: 20px;
                height: 20px;
                color: #fff;
                display: block;
            }

            .pgx-btn-text {
                display: flex;
                flex-direction: column;
                margin-left: 15px;
                text-align: left;
                flex: 1;
            }
            .pgx-btn-title { 
                color: #FFF; 
                font-size: 16px; 
                font-weight: 700; 
                letter-spacing: 0.02em;
                text-shadow: 0 1px 3px rgba(0,0,0,0.6);
            }
            .pgx-btn-sub { 
                color: #a38c75; 
                font-size: 11.5px; 
                margin-top: 1px; 
                font-weight: 500;
            }
            
            .pgx-btn-arrow {
                width: 18px;
                height: 18px;
                color: rgba(209, 171, 102, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            .pgx-btn-arrow svg {
                width: 100%;
                height: 100%;
            }
            .pgx-btn:hover .pgx-btn-arrow {
                color: #d1ab66;
                transform: translateX(4px);
            }

            /* Custom Palette Glass colors */
            .pgx-line { 
                border-color: rgba(125, 195, 112, 0.22);
            }
            .pgx-line .pgx-btn-icon-wrapper {
                background: linear-gradient(135deg, rgba(88, 142, 80, 0.3) 0%, rgba(62, 104, 55, 0.1) 100%);
                border-color: rgba(125, 195, 112, 0.35);
            }
            .pgx-line:hover {
                background: rgba(88, 142, 80, 0.08);
                border-color: rgba(125, 195, 112, 0.65);
                box-shadow: 0 6px 20px rgba(88, 142, 80, 0.25), inset 0 1px 0 rgba(255,255,255,0.06);
            }

            .pgx-info-box {
                margin-top: 20px;
                padding: 16px;
                border-radius: 14px;
                text-align: left;
                line-height: 1.55;
                background: linear-gradient(165deg, rgba(34, 25, 21, 0.95) 0%, rgba(16, 11, 9, 0.98) 100%);
                border: 1px solid rgba(201, 176, 136, 0.22);
                border-left: 3px solid #c9a24d;
                box-shadow:
                    0 10px 30px rgba(0, 0, 0, 0.45),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05);
            }
            .pgx-info-head {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 10px;
                padding-bottom: 8px;
                border-bottom: 1px solid rgba(201, 176, 136, 0.12);
            }
            .pgx-info-badge {
                flex-shrink: 0;
                width: 30px;
                height: 30px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, rgba(209, 171, 102, 0.18) 0%, rgba(209, 171, 102, 0.04) 100%);
                border: 1px solid rgba(209, 171, 102, 0.32);
            }
            .pgx-shield-svg {
                width: 16px;
                height: 16px;
                color: #d1ab66;
                display: block;
                animation: pgxShieldPulse 3s infinite ease-in-out;
            }
            .pgx-info-title {
                font-size: 13.5px;
                font-weight: 700;
                letter-spacing: 0.02em;
                color: #e8c992;
                margin: 0;
                flex: 1;
            }
            .pgx-info-desc {
                margin: 0;
                font-size: 12px;
                font-weight: 400;
                color: #c9b8a4;
                line-height: 1.6;
            }

            /* Click-To-Copy domain interface styling */
            .pgx-copy-container {
                margin-top: 14px;
                padding: 10px 12px;
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(209, 171, 102, 0.12);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            }
            .pgx-copy-label {
                font-size: 10.5px;
                color: #8c7662;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
            }
            .pgx-copy-input-group {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                padding: 5px 12px;
                border-radius: 6px;
                background: rgba(209, 171, 102, 0.06);
                border: 1px solid rgba(209, 171, 102, 0.22);
                transition: all 0.2s ease;
                position: relative;
            }
            .pgx-copy-input-group:hover {
                background: rgba(209, 171, 102, 0.12);
                border-color: rgba(209, 171, 102, 0.45);
            }
            .pgx-copy-input-group:focus-visible {
                border-color: #d1ab66;
                box-shadow: 0 0 0 2px rgba(209, 171, 102, 0.3);
            }
            .pgx-copy-val {
                font-size: 11.5px;
                font-weight: 700;
                color: #e8c992;
                letter-spacing: 0.03em;
            }
            .pgx-copy-icon {
                color: #d1ab66;
                width: 14px;
                height: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s ease;
            }
            .pgx-copy-svg {
                width: 100%;
                height: 100%;
            }
            
            /* Copy success tooltip */
            .pgx-copy-tooltip {
                position: absolute;
                bottom: 125%;
                right: 0;
                background: #d1ab66;
                color: #120907;
                font-size: 11px;
                font-weight: 700;
                padding: 4px 10px;
                border-radius: 4px;
                opacity: 0;
                transform: translateY(5px);
                pointer-events: none;
                transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 4px;
                z-index: 100;
            }
            .pgx-copy-tooltip.active {
                opacity: 1;
                transform: translateY(0);
            }
            .pgx-copy-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                right: 14px;
                border: 5px solid transparent;
                border-top-color: #d1ab66;
            }

            .pgx-footer-text {
                margin-top: 18px;
                text-align: center;
                font-size: 11px;
                color: #8c7662;
                letter-spacing: 0.02em;
                line-height: 1.6;
            }
            
            /* Accessibility: custom focus ring for keyboard navigation */
            .pgx-btn:focus-visible {
                border-color: #d1ab66;
                box-shadow: 0 0 0 2.5px rgba(209, 171, 102, 0.5), inset 0 1px 0 rgba(255,255,255,0.15);
            }
        `;
        document.head.appendChild(style);

        // --- HTML INJECTION ---
        const popupHTML = `
            <div id="pgx_final_overlay" role="dialog" aria-modal="true" lang="th" aria-labelledby="pgx_title">
                <div id="pgx_final_container">
                    <div id="pgx_glow_effect"></div>
                    <button type="button" id="pgx_final_close" aria-label="ปิดโฆษณา">×</button>
                    
                    <div class="pgx-header">
                        <div class="pgx-header-logo">
                            <img src="${CONFIG.logoUrl}" width="240" height="80" alt="PGBET888 LOGO" decoding="async" loading="eager">
                        </div>
                    </div>
                    
                    <div id="pgx_final_content">
                        <h1 class="pgx-content-heading" id="pgx_title">PGBET888 ทางเข้า VIP</h1>
                        
                        <!-- PREMIUM BANNER -->
                        ${CONFIG.bannerUrl ? '<div class="pgx-banner-wrapper"><a href="' + L.line + '" target="_blank" rel="noopener" tabindex="0"><img src="' + CONFIG.bannerUrl + '" alt="Promotion Banner" decoding="async" loading="eager"></a></div>' : ''}
                        
                        <div class="pgx-btn-grid" role="group" aria-label="ช่องทางด่วน">
                            <!-- LINE BUTTON -->
                            <a class="pgx-btn pgx-line" href="${L.line}" target="_blank" rel="noopener" tabindex="0">
                                <div class="pgx-btn-icon-wrapper">
                                    <svg class="pgx-btn-svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22 10.366c0-4.87-4.486-8.834-10-8.834S2 5.496 2 10.366c0 4.366 3.56 8.028 8.368 8.749.325.07.768.243.88.556.102.285.066.732.032 1.02l-.18 1.08c-.055.33-.26 1.288 1.12.703 1.38-.585 7.443-4.382 10.15-7.5.823-.925 1.43-1.927 1.43-2.915-.002-.233-.002-.46-.002-.693zm-13.88 2.01h-2.12c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1.62v-1.84H6.002c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2.118c.28 0 .5.22 .5.5v2.84c.002.28-.218.5-.498.5zm3.178 0c-.28 0-.5-.22-.5-.5v-2.84c0-.28.22-.5.5-.5s.5.22.5.5v2.84c0 .28-.22.5-.5.5zm4.84 0h-2.118c-.28 0-.5-.22-.5-.5v-2.84c0-.28.22-.5.5-.5s.5.22.5.5v2.34h1.62c.28 0 .5.22 .5.5s-.22.5-.5.5zm4.316-1c0 .28-.22.5-.5.5h-2.12c-.28 0-.5-.22-.5-.5v-2.84c0-.28.22-.5.5-.5h2.12c.28 0 .5.22 .5.5s-.22.5-.5.5h-1.62v.42h1.62c.28 0 .5.22 .5.5s-.22.5-.5.5h-1.62v.42h1.62c.28 0 .5.22 .5.5z"/>
                                    </svg>
                                </div>
                                <div class="pgx-btn-text">
                                    <span class="pgx-btn-title">LINE 💬</span>
                                    <span class="pgx-btn-sub">ติดต่อฝ่ายบริการลูกค้า 24 ชม.</span>
                                </div>
                                <div class="pgx-btn-arrow" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                </div>
                            </a>
                        </div>

                        <!-- VERIFIED INFO CONTAINER -->
                        <div class="pgx-info-box" role="note">
                            <div class="pgx-info-head">
                                <div class="pgx-info-badge">
                                    <svg class="pgx-shield-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        <rect x="9" y="11" width="6" height="5" rx="1"/>
                                        <path d="M10 11V9a2 2 0 1 1 4 0v2"/>
                                    </svg>
                                </div>
                                <span class="pgx-info-title">ระบบความปลอดภัย PGBET888</span>
                            </div>
                            <p class="pgx-info-desc">เพื่อความปลอดภัยขั้นสูงสุด หลีกเลี่ยงลิงก์หลอกลวงของมิจฉาชีพ กรุณาใช้เฉพาะช่องทางผ่านปุ่มด้านบน หรือบันทึกเว็บไซต์ทางการด้านล่างนี้ และงดการทำธุรกรรมนอกเว็บไซต์ทุกกรณี</p>
                            
                            <!-- INTERACTIVE CLIPBOARD COMPONENT -->
                            <div class="pgx-copy-container">
                                <span class="pgx-copy-label">ลิงก์อย่างเป็นทางการ</span>
                                <div class="pgx-copy-input-group" id="pgx_copy_link_btn" role="button" tabindex="0" aria-label="คัดลอกเว็บทางการ">
                                    <span class="pgx-copy-val">${CONFIG.officialDomain}</span>
                                    <span class="pgx-copy-icon" aria-hidden="true">
                                        <svg class="pgx-copy-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                        </svg>
                                    </span>
                                    <div class="pgx-copy-tooltip" id="pgx_copy_tooltip">
                                        <span class="pgx-copy-tooltip-text">คัดลอกสำเร็จ!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pgx-footer-text">
                            © 2026 PGBET888 สงวนลิขสิทธิ์ความปลอดภัยทุกประการ
                        </div>
                    </div>
                </div>
            </div>
        `;

        function initPopup() {
            // Write html to body
            document.body.insertAdjacentHTML('beforeend', popupHTML);

            const overlay = document.getElementById('pgx_final_overlay');
            const container = document.getElementById('pgx_final_container');
            const closeBtn = document.getElementById('pgx_final_close');
            const copyBtn = document.getElementById('pgx_copy_link_btn');

            // Set frequency cap in sessionStorage / localStorage
            if (!CONFIG.debugMode) {
                if (CONFIG.frequency === 'once-per-session') {
                    sessionStorage.setItem('pgx_popup_shown', 'true');
                } else if (CONFIG.frequency === 'once-per-day') {
                    localStorage.setItem('pgx_popup_last_shown', Date.now().toString());
                }
            }

            // Click Handlers
            if (closeBtn) closeBtn.addEventListener('click', closePopup);

            if (overlay) {
                overlay.addEventListener('click', function (e) {
                    if (e.target === overlay) closePopup();
                });
            }

            // Spotlight cursor effect
            if (container) {
                container.addEventListener('mousemove', function (e) {
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    container.style.setProperty('--mouse-x', x + 'px');
                    container.style.setProperty('--mouse-y', y + 'px');
                });
            }

            // Copy clip functionality
            if (copyBtn) {
                copyBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const copyText = CONFIG.officialDomain;

                    const handleSuccess = () => {
                        const tooltip = document.getElementById('pgx_copy_tooltip');
                        if (tooltip) {
                            tooltip.classList.add('active');
                            const iconWrap = copyBtn.querySelector('.pgx-copy-icon');
                            if (iconWrap) {
                                const prevHTML = iconWrap.innerHTML;
                                iconWrap.innerHTML = `
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#588e50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                `;
                                setTimeout(() => { iconWrap.innerHTML = prevHTML; }, 2000);
                            }
                            setTimeout(() => { tooltip.classList.remove('active'); }, 2000);
                        }
                    };

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(copyText).then(handleSuccess).catch(() => {
                            fallbackCopy(copyText, handleSuccess);
                        });
                    } else {
                        fallbackCopy(copyText, handleSuccess);
                    }
                });

                copyBtn.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        copyBtn.click();
                    }
                });
            }

            function fallbackCopy(text, cb) {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                try {
                    document.execCommand('copy');
                    cb();
                } catch (err) {
                    console.error('Copy fallback failed', err);
                }
                document.body.removeChild(ta);
            }

            // Accessibility: Modal Keyboard Focus Trapping & ESC key dismissal
            if (overlay && container) {
                const focusableElements = container.querySelectorAll('button, a[href], [tabindex="0"]');
                if (focusableElements.length > 0) {
                    const firstEl = focusableElements[0];
                    const lastEl = focusableElements[focusableElements.length - 1];

                    // Autofocus trigger on entry
                    setTimeout(() => { firstEl.focus(); }, 150);

                    overlay.addEventListener('keydown', function (e) {
                        if (e.key === 'Tab') {
                            if (e.shiftKey) { /* Shift + Tab */
                                if (document.activeElement === firstEl) {
                                    lastEl.focus();
                                    e.preventDefault();
                                }
                            } else { /* Tab */
                                if (document.activeElement === lastEl) {
                                    firstEl.focus();
                                    e.preventDefault();
                                }
                            }
                        } else if (e.key === 'Escape') {
                            closePopup();
                        }
                    });
                }
            }
        }

        setTimeout(() => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initPopup);
            } else {
                initPopup();
            }
        }, CONFIG.delayShow);
    };

    if (shouldRun()) {
        startPopup();
    }
})();
