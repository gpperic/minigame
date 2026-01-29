// -----------------------------------------------------------
// firebase-config.js
// : 모든 Firebase 설정과 초기화는 여기서만 관리합니다.
// -----------------------------------------------------------

// 1. Firebase 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics, logEvent as firebaseLogEvent } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// 2. Firebase 설정을 Hosting reserved URL에서 런타임에 주입
let analyticsPromise = null;

async function initFirebase() {
    if (analyticsPromise) return analyticsPromise;
    analyticsPromise = (async () => {
        const response = await fetch("/__/firebase/init.json");
        if (!response.ok) {
            throw new Error("Failed to load Firebase config from /__/firebase/init.json");
        }
        const firebaseConfig = await response.json();
        const app = initializeApp(firebaseConfig);
        return getAnalytics(app);
    })();
    return analyticsPromise;
}

// 3. 다른 파일에서 쓸 수 있도록 내보내기 (Export)
export async function getAnalyticsInstance() {
    try {
        return await initFirebase();
    } catch (error) {
        console.warn("[firebase] analytics init failed:", error);
        return null;
    }
}

export function logEvent(analytics, eventName, params = {}) {
    if (!analytics) {
        console.log("[analytics:local]", eventName, params);
        return;
    }
    firebaseLogEvent(analytics, eventName, params);
}
