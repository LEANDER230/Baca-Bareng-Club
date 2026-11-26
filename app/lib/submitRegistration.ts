export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx3KCF4-8fUU-M9KNGLRq5lea992-XPylo7X3h5S5OrU28wSZln_JTiLRPaDs8z8uIxog/exec";

export interface QuotaResponse {
  online: { total: number; remaining: number; isFull: boolean };
  offline: { total: number; remaining: number; isFull: boolean };
}

export async function fetchQuota(): Promise<QuotaResponse | null> {
  if (!APPS_SCRIPT_URL) return null;

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

// Kompres gambar otomatis di browser agar upload 1-2 file foto jauh lebih cepat
function compressImage(file: File, maxWidth = 1080, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Gagal memproses gambar"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl.split(",")[1]);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("File gambar tidak valid"));
    };

    img.src = objectUrl;
  });
}

export async function fileToPayload(file: File) {
  if (file.type.startsWith("image/")) {
    const base64 = await compressImage(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
    return {
      base64,
      mimeType: "image/jpeg",
      name: cleanName,
    };
  }

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
  if (!APPS_SCRIPT_URL) {
    throw new Error("URL Apps Script belum diatur.");
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
