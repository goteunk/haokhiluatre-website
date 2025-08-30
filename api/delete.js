// api/delete.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// POST { bucket, path }  + header: x-upload-password
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const pass = req.headers['x-upload-password'] || req.query?.password;
  if (pass !== process.env.UPLOAD_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { bucket, path } = body || {};
    if (!bucket || !path) return res.status(400).json({ error: 'Missing bucket/path' });

    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Delete failed' });
  }
}
