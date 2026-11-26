// TEMPEL URL WEB APP APPS SCRIPT (/exec) KAMU DI DALAM TANDA KUTIP INI:
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3KCF4-8fUU-M9KNGLRq5lea992-XPylo7X3h5S5OrU28wSZln_JTiLRPaDs8z8uIxog/exec";

export interface QuotaResponse {
  online: { total: number; remaining: number; isFull: boolean };
  offline: { total: number; remaining: number; isFull: boolean };
}

export async function fetchQuota(): Promise<QuotaResponse | null> {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("https://script.google.com/macros/s/AKfycbx3KCF4-8fUU-M9KNGLRq5lea992-XPylo7X3h5S5OrU28wSZln_JTiLRPaDs8z8uIxog/exec")) {
    return null;
  }

  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fileToPayload(file: File) {
  return new Promise<{ base64: string; mimeType: string; name: string }>(
    (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve({
          base64,
          mimeType: file.type || "application/octet-stream",
          name: file.name,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }
  );
}

export async function submitToSheet(payload: Record<string, unknown>) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("https://script.google.com/macros/s/AKfycbx3KCF4-8fUU-M9KNGLRq5lea992-XPylo7X3h5S5OrU28wSZln_JTiLRPaDs8z8uIxog/exec")) {
    throw new Error("https://script.google.com/macros/s/AKfycbx3KCF4-8fUU-M9KNGLRq5lea992-XPylo7X3h5S5OrU28wSZln_JTiLRPaDs8z8uIxog/exec");
  }

  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  return { status: "success" };
}
