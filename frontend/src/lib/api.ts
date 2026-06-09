const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function fetchProduct(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

export async function fetchDPPs() {
  const response = await fetch(`${API_URL}/dpps`);
  if (!response.ok) {
    throw new Error("Failed to fetch DPPs");
  }
  return response.json();
}

export async function fetchDPP(id: string) {
  const response = await fetch(`${API_URL}/dpps/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch DPP");
  }
  return response.json();
}

export async function createDPP(data: any) {
  const response = await fetch(`${API_URL}/dpps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create DPP");
  }
  return response.json();
}

export async function updateDPP(id: string, data: any) {
  const response = await fetch(`${API_URL}/dpps/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update DPP");
  }
  return response.json();
}
