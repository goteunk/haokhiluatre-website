// api/content/[bucket].js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { bucket } = req.query; // e.g. images | videos | models
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return res.status(500).json({ error: 'Missing Supabase env' });
    }

    const supabase = createClient(url, serviceKey);

    // liệt kê file ở root của bucket
    const { data, error } = await supabase.storage.from(bucket).list('', {
      limit: 1000,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) return res.status(500).json({ error: error.message });

    // map sang public URL
    const files =
      (data || []).map((f) => ({
        name: f.name,
        path: f.name,
        url: supabase.storage.from(bucket).getPublicUrl(f.name).data.publicUrl,
      })) || [];

    return res.status(200).json({ ok: true, files });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
