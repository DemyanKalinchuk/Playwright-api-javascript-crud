const SUCCESS = new Set([200, 201, 202, 204, 205]);
const RETRYABLE = new Set([409, 410, 429, 500, 502]);

/**
 * Lightweight HTTP wrapper over Playwright's request context.
 * Uses the per-test `request` fixture (APIRequestContext) and attaches Allure info via testInfo.
 */
export async function httpCall({ request, testInfo, method, url, headers = {}, body }) {
  const mergedHeaders = { 'Content-Type': 'application/json', ...headers };

  let attempt = 0;
  const max = Number(process.env.RETRY_MAX ?? 2);
  let wait = 400;
  let response;

  while (true) {
    attempt += 1;
    response = await request.fetch(url, {
      method,
      headers: mergedHeaders,
      data: body ?? undefined
    });

    if (!RETRYABLE.has(response.status()) || attempt > max) break;
    await new Promise(r => setTimeout(r, wait));
    wait = Math.min(wait * 2, 4000);
  }

  const text = await response.text();
  const looksLikeHtml = text.startsWith('<!DOCTYPE') || text.startsWith('<html');

  // Allure attachments (best-effort)
  try {
    await testInfo.attach(`HTTP ${method} ${url} META`, {
      body: `Status: ${response.status()} ${response.statusText()}\nHeaders: ${JSON.stringify(Object.fromEntries(response.headers()), null, 2)}`,
      contentType: 'text/plain'
    });
    await testInfo.attach(`HTTP ${method} ${url} BODY`, {
      body: looksLikeHtml ? text : JSON.stringify(JSON.parse(text), null, 2),
      contentType: looksLikeHtml ? 'text/html' : 'application/json'
    });
  } catch { /* ignore */ }

  if (!SUCCESS.has(response.status())) {
    // Throw with a helpful hint if you hit the wrong host
    const hint = looksLikeHtml ? '\nHint: looks like HTML – check BASE_URL and endpoint path.' : '';
    throw new Error(`Bad request: expected ${[...SUCCESS]} but got ${response.status()}.\nResponse: ${text}${hint}`);
  }

  return { response, text, json: safeJson(text) };
}

export async function httpCallRaw({ request, testInfo, method, url, headers = {}, body }) {
  // same as httpCall but without enforcing success (for negative tests)
  const mergedHeaders = { 'Content-Type': 'application/json', ...headers };
  const resp = await request.fetch(url, { method, headers: mergedHeaders, data: body ?? undefined });
  const text = await resp.text();
  try {
    await testInfo.attach(`RAW ${method} ${url} META`, {
      body: `Status: ${resp.status()} ${resp.statusText()}`,
      contentType: 'text/plain'
    });
    await testInfo.attach(`RAW ${method} ${url} BODY`, { body: text, contentType: 'text/plain' });
  } catch {}
  return { response: resp, text, json: safeJson(text) };
}

function safeJson(text) { try { return JSON.parse(text); } catch { return null; } }
