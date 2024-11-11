import { GraphQLFormattedError } from "graphql";

type Error = {
  message: string;
  statusCode: string;
};

// دالة مخصصة لإجراء fetch مع إضافة الهيدر المناسب
const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");
  const headers = options.headers as Record<string, string>;
  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true",
    },
  });
};

// دالة لاستخراج الأخطاء من استجابة GraphQL
const getGraphQlErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }
  if ("errors" in body) {
    const errors = body?.errors;
    const message =
      errors?.map((error) => error?.message)?.join("") ||
      "Unknown GraphQL error";
    const code = errors?.[0]?.extensions?.code || "500";
    return {
      message: message,
      statusCode: code,
    };
  }
  return null;
};

// دالة لربط fetch مع معالجة الأخطاء التي قد تحدث في GraphQL
export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options); // تنفيذ fetch المخصص
  const responseClone = response.clone(); // نسخ الاستجابة للاستخدام لاحقاً
  const body = await responseClone.json(); // تحويل الاستجابة إلى JSON
  const error = getGraphQlErrors(body); // استخراج الأخطاء من الجسم
  if (error) {
    throw error; // في حالة وجود خطأ، يتم رميه
  }
  return response; // إعادة الاستجابة إذا لم يكن هناك أخطاء
};
