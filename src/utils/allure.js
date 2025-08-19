export async function attachJson(testInfo, name, data) {
    const body = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    await testInfo.attach(`${name} (json)`, { body, contentType: 'application/json' });
  }
  export async function attachText(testInfo, name, text) {
    await testInfo.attach(`${name} (text)`, { body: text, contentType: 'text/plain' });
  }
  