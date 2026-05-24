window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 1. 强制设置电脑端User-Agent（核心）
Object.defineProperty(navigator, 'userAgent', {
    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    writable: false,
    configurable: false
});

// 2. 隐藏平台信息，伪装成Windows
Object.defineProperty(navigator, 'platform', { value: 'Win32', configurable: false });
Object.defineProperty(navigator, 'appVersion', { value: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', configurable: false });

// 3. 禁用触摸事件，避免被识别为触屏设备
Object.defineProperty(window, 'ontouchstart', { value: undefined, configurable: true });
delete window.ontouchstart;
delete window.ontouchend;
delete window.ontouchmove;

// 4. 强制修改视口，让页面按桌面端渲染
const viewportMeta = document.querySelector('meta[name="viewport"]');
if (viewportMeta) {
    viewportMeta.content = 'width=1920, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
} else {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=1920, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
}

// 5. 强制新链接在当前窗口打开（修复_blank链接）
const hookClick = (e) => {
    const origin = e.target.closest('a');
    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]');
    if (origin && origin.href && (origin.target === '_blank' || isBaseTargetBlank)) {
        e.preventDefault();
        location.href = origin.href;
    }
};
window.open = function(url) {
    if (url) location.href = url;
    return null;
};
document.addEventListener('click', hookClick, { capture: true });

// 6. 强制B站跳转到纯PC版页面
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.href.includes('bilibili.com')) {
        if (!window.location.href.includes('from=pc')) {
            window.location.href = 'https://www.bilibili.com/?from=pc';
        }
    }
});