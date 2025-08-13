import { API_ENDPOINTS } from "@/app/config/api";

export async function POST(request) {
  try {
    const body = await request.json();

    // Forward the request to the backend API
    const backendResponse = await fetch(API_ENDPOINTS.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Get the Set-Cookie header from backend response
    const setCookieHeader = backendResponse.headers.get('Set-Cookie');

    const data = await backendResponse.json();
    
  const response = new Response(JSON.stringify(data), {
      status: backendResponse.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  // If backend sets a cookie, re-set it for the frontend domain
  if (setCookieHeader) {
    try {
      const url = new URL(request.url);
      const host = url.hostname; // e.g. exchange.taganeh.ir
      const isSecure = url.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https' || request.headers.get('X-Forwarded-Proto') === 'https';
      // Pick the first cookie (assuming auth cookie)
      const raw = setCookieHeader.split(',')[0];
      const parts = raw.split(';').map(s => s.trim());
      const [nameValue, ...attrs] = parts;
      const [cookieName, cookieValue] = nameValue.split('=');

      // Preserve Expires/Max-Age if present
      const expiresAttr = attrs.find(a => a.toLowerCase().startsWith('expires='));
      const maxAgeAttr = attrs.find(a => a.toLowerCase().startsWith('max-age='));

      const rebuilt = [
        `${cookieName}=${cookieValue}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        `Domain=${host}`,
        isSecure ? 'Secure' : ''
      ]
      .concat(expiresAttr ? [expiresAttr] : [])
      .concat(maxAgeAttr ? [maxAgeAttr] : [])
      .filter(Boolean)
      .join('; ');

      response.headers.append('Set-Cookie', rebuilt);
    } catch (e) {
      // Fallback to original cookie if rewriting fails
      response.headers.append('Set-Cookie', setCookieHeader);
    }
  }

    return response;
  } catch (error) {
    console.error("Error proxying login request:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 