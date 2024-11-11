// استيراد المكتبات والملفات المطلوبة
import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlliveProvider,
} from "@refinedev/nestjs-query";

// تأكد من أن المسار إلى Fetch-wrapper صحيح (أضف الامتداد .ts إذا لزم الأمر)
import { fetchWrapper } from "./Fetch-wraooer";
import { createClient } from "graphql-ws";

// تعريف بعض الثوابت الخاصة بالـ API
export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = "wss://api.crm.refine.dev/graphql";

// إعداد عميل GraphQL
export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options); // استخدام الدالة المصدرة من Fetch-wrapper
    } catch (error) {
      return Promise.reject(error as Error); // معالجة الأخطاء في حالة حدوثها
    }
  },
});

// إعداد WebSocket Client للتعامل مع GraphQL live queries
export const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token"); // جلب التوكن من Local Storage
          return {
            headers: {
              Authorization: `Bearer ${accessToken}`, // إضافة التوكن في الهيدر
            },
          };
        },
      })
    : undefined;

// توفير dataProvider و liveProvider للتفاعل مع البيانات عبر GraphQL
export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient
  ? graphqlliveProvider(wsClient) // التأكد من أن WebSocket موجود قبل استخدامه
  : undefined;
