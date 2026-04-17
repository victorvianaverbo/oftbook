const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || null;

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

async function insertLead(payload, clientIp) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { ok: false, error: 'Supabase env vars not set' };
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ ...payload, client_ip: clientIp })
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `Supabase ${res.status}: ${text}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function sendCapi(data, clientIp) {
  if (!META_CAPI_TOKEN || !META_PIXEL_ID) {
    return { ok: false, error: 'Meta CAPI env vars not set' };
  }

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
  if (META_TEST_EVENT_CODE) body.test_event_code = META_TEST_EVENT_CODE;

  const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return { ok: res.ok, response: json };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let data;
  try { data = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  if (!data.nome || !data.email || !data.telefone) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  const clientIp =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    null;

  const [supa, capi] = await Promise.all([
    insertLead(data, clientIp),
    sendCapi(data, clientIp)
  ]);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ supabase: supa, capi })
  };
};
