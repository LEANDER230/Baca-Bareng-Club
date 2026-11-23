export const APPS_SCRIPT_URL = "https://script.google.com/u/0/home/projects/1SLp0A82Db0cyhFvd4Pg_rt83piX5u8O0g9nF-LnQXV1dv_1Rp3Iv0WUs/edit";

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
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Gagal mengirim data pendaftaran.");
  }
  return res.json();
}
