const crypto = require('crypto');

const PIXEL_ID = process.env.META_PIXEL_ID || '1159501601844210';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || null;

function sha256(value) {
  if (!value) return null;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

function normalizePhone(phone) {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return null;
  return digits.startsWith('55') ? digits : '55' + digits;
}

function splitName(full) {
  if (!full) return { first: null, last: null };
  const parts = String(full).trim().split(/\s+/);
  return {
    first: parts[0] || null,
    last: parts.length > 1 ? parts.slice(1).join(' ') : null
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  if (!ACCESS_TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: 'META_CAPI_TOKEN not set' }) };
  }

  let data;
  try { data = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  const clientIp =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    null;

  const { first, last } = splitName(data.nome);
  const phoneNormalized = normalizePhone(data.telefone);

  const userData = {
    em: data.email ? [sha256(data.email)] : undefined,
    ph: phoneNormalized ? [sha256(phoneNormalized)] : undefined,
    fn: first ? [sha256(first)] : undefined,
    ln: last ? [sha256(last)] : undefined,
    client_ip_address: clientIp || undefined,
    client_user_agent: data.user_agent || undefined,
    fbc: data.fbc || undefined,
    fbp: data.fbp || undefined
  };
  Object.keys(userData).forEach(k => userData[k] === undefined && delete userData[k]);

  const customData = {
    content_name: 'Download App',
    content_category: data.cta_source || 'unknown'
  };
  if (data.utm_source) customData.utm_source = data.utm_source;
  if (data.utm_campaign) customData.utm_campaign = data.utm_campaign;
  if (data.utm_medium) customData.utm_medium = data.utm_medium;

  const body = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: data.event_id,
      event_source_url: data.page_url,
      action_source: 'website',
      user_data: userData,
      custom_data: customData
    }]
  };
  if (TEST_EVENT_CODE) body.test_event_code = TEST_EVENT_CODE;

  const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return {
      statusCode: res.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
