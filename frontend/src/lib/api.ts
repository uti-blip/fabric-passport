const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("fp_token");
}

async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!headers["Content-Type"] && options.method !== "GET") {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem("fp_token");
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
    throw new Error("Session expired");
  }
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Request failed: ${res.status}`);
  }
  return res;
}

// ── Auth ─────────────────────────────────────────────
export function logout() {
  localStorage.removeItem("fp_token");
  window.location.href = "/auth";
}

// ── Products ─────────────────────────────────────────
export async function fetchProducts() {
  const res = await authFetch("/products");
  return res.json();
}

export async function fetchProduct(id: string) {
  const res = await authFetch(`/products/${id}`);
  return res.json();
}

export async function createProduct(data: { name: string; sku?: string; description?: string; brand_id: string }) {
  const res = await authFetch("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

// ── DPPs ─────────────────────────────────────────────
export async function fetchDPPs() {
  const res = await authFetch("/dpps");
  return res.json();
}

export async function fetchDPP(id: string) {
  const res = await authFetch(`/dpps/${id}`);
  return res.json();
}

export async function fetchDPPPublic(id: string) {
  const res = await fetch(`${API_URL}/dpps/public/${id}`);
  if (!res.ok) throw new Error("DPP not found");
  return res.json();
}

export async function createDPP(data: Record<string, unknown>) {
  const res = await authFetch("/dpps", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateDPP(id: string, data: Record<string, unknown>) {
  const res = await authFetch(`/dpps/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}
