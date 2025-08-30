// api/signed-upload.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // SERVER-ONLY
);

// POST { bucket, filename, folder? }  + header: x-upload-password
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const pass = req.headers['x-upload-password'] || req.query?.password;
  if (pass !== process.env.UPLOAD_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const bucket = body?.bucket || 'images';
    const filename = body?.filename || `file-${Date.now()}`;
    const folder = body?.folder ? `${body.folder}/` : '';
    const path = `${folder}${Date.now()}-${filename}`;

    const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);
    if (error) return res.status(500).json({ error: error.message });

    // Trả url để trình duyệt PUT file trực tiếp
    return res.status(200).json({ bucket, path: data.path || path, uploadUrl: data.signedUrl });
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Failed' });
  }
}
