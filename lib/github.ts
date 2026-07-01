const OWNER = "Boro23-wq";
const REPO = "boro.im";
const BRANCH = "master";

const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

function authHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export function textToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export async function getGitHubUser(accessToken: string): Promise<{ login: string } | null> {
  const res = await fetch("https://api.github.com/user", { headers: authHeaders(accessToken) });
  if (!res.ok) return null;
  const data = await res.json();
  return { login: data.login };
}

export async function getFileSha(
  accessToken: string,
  path: string,
): Promise<string | null> {
  const res = await fetch(`${API_BASE}/contents/${path}?ref=${BRANCH}`, {
    headers: authHeaders(accessToken),
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to look up ${path}: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.sha as string;
}

export async function putFile(
  accessToken: string,
  path: string,
  base64Content: string,
  message: string,
  sha?: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "PUT",
    headers: { ...authHeaders(accessToken), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to write ${path}: ${res.status} ${await res.text()}`);
  }
}

export async function deleteFile(
  accessToken: string,
  path: string,
  message: string,
  sha: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "DELETE",
    headers: { ...authHeaders(accessToken), "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });
  if (!res.ok) {
    throw new Error(`Failed to delete ${path}: ${res.status} ${await res.text()}`);
  }
}
