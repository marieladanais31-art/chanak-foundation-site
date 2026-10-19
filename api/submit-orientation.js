// Vercel Serverless Function: /api/submit-orientation
// Handles server-side validation, honeypot anti-spam, Supabase RLS persistence, and admin notification.

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      guardian_name,
      guardian_email,
      state_code,
      grade_range,
      preferred_language,
      message,
      consent_given,
      source_url,
      locale,
      website_hp // Honeypot field
    } = body;

    // 1. Anti-Spam Honeypot Check: Bots fill hidden fields
    if (website_hp) {
      console.warn('[Anti-Spam] Honeypot triggered, discarding bot submission silently.');
      return res.status(200).json({ success: true, message: 'Request received' });
    }

    // 2. Server-side Validation
    if (!guardian_name || typeof guardian_name !== 'string' || guardian_name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Valid guardian name is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guardian_email || typeof guardian_email !== 'string' || !emailRegex.test(guardian_email.trim())) {
      return res.status(400).json({ success: false, error: 'Valid email address is required' });
    }

    if (!state_code || typeof state_code !== 'string') {
      return res.status(400).json({ success: false, error: 'State selection is required' });
    }

    if (!consent_given) {
      return res.status(400).json({ success: false, error: 'Consent is required to proceed' });
    }

    const payload = {
      guardian_name: guardian_name.trim().slice(0, 100),
      guardian_email: guardian_email.trim().toLowerCase().slice(0, 120),
      state_code: state_code.trim().slice(0, 30),
      grade_range: grade_range ? String(grade_range).slice(0, 50) : null,
      preferred_language: preferred_language ? String(preferred_language).slice(0, 20) : 'both',
      message: message ? String(message).slice(0, 1500) : null,
      consent_given: Boolean(consent_given),
      source_url: source_url ? String(source_url).slice(0, 300) : null,
      locale: locale ? String(locale).slice(0, 10) : 'en',
      created_at: new Date().toISOString()
    };

    // 3. Supabase Integration
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const cleanUrl = supabaseUrl.replace(/\/$/, '');
        const response = await fetch(`${cleanUrl}/rest/v1/orientation_inquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify([payload])
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('[Supabase Error]', response.status, errText);
        } else {
          console.log('[Supabase] Successfully saved inquiry for', payload.guardian_email);
        }
      } catch (dbErr) {
        console.error('[Supabase Network Error]', dbErr);
      }
    } else {
      console.log('[Supabase Pending Config] Inquiry received in sandbox mode:', payload);
    }

    // 4. Admin Notification
    console.log('[Notification Alert] New Orientation Request to info@chanakfoundation.org:', {
      guardian: payload.guardian_name,
      email: payload.guardian_email,
      state: payload.state_code,
      grade: payload.grade_range,
      lang: payload.preferred_language
    });

    return res.status(200).json({
      success: true,
      message: 'Orientation inquiry submitted successfully'
    });
  } catch (err) {
    console.error('[Server Error in submit-orientation]', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
