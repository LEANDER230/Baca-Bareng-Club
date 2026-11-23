export const APPS_SCRIPT_URL = "GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT_KAMU";

export interface QuotaResponse {
  online: { total: number; remaining: number; isFull: boolean };
  offline: { total: number; remaining: number; isFull: boolean };
}

export async function fetchQuota(): Promise<QuotaResponse | null> {
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`, {
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
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("GANTI_DENGAN")) {
    throw new Error("URL Apps Script belum dipasang di submitRegistration.ts");
  }

  // Menggunakan text/plain + no-cors agar Google Apps Script tidak diblokir browser
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
