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
      academy_contact_consent,
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
      academy_contact_consent: Boolean(academy_contact_consent),
      source_url: source_url ? String(source_url).slice(0, 300) : null,
      locale: locale ? String(locale).slice(0, 10) : 'en',
      created_at: new Date().toISOString()
    };

    let savedInSupabase = false;
    let emailDispatched = false;

    // 3. Supabase Database Persistence
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
          savedInSupabase = true;
        }
      } catch (dbErr) {
        console.error('[Supabase Network Error]', dbErr);
      }
    } else {
      console.warn('[Supabase Warning] SUPABASE_URL or keys not configured in environment variables.');
    }

    // 4. Email Backup via Resend (to info@chanakfoundation.org)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Chanak Foundation <onboarding@resend.dev>',
            to: ['info@chanakfoundation.org'],
            reply_to: payload.guardian_email,
            subject: `Nueva Solicitud de Orientación: ${payload.guardian_name} (${payload.state_code.toUpperCase()})`,
            html: `
              <h2>Nueva Solicitud de Orientación Educativa</h2>
              <p><strong>Tutor / Padre:</strong> ${payload.guardian_name}</p>
              <p><strong>Correo electrónico:</strong> <a href="mailto:${payload.guardian_email}">${payload.guardian_email}</a></p>
              <p><strong>Estado de Residencia:</strong> ${payload.state_code}</p>
              <p><strong>Nivel Escolar:</strong> ${payload.grade_range || 'No especificado'}</p>
              <p><strong>Idioma Preferido:</strong> ${payload.preferred_language}</p>
              <p><strong>Notas / Preguntas:</strong> ${payload.message || 'Ninguna'}</p>
              <p><strong>Consentimiento Orientación:</strong> Aceptado</p>
              <p><strong>Autorización Contacto Academy:</strong> ${payload.academy_contact_consent ? '<span style="color:#15803d;font-weight:bold;">SÍ (Autorizado para compartir con Academy)</span>' : '<span style="color:#b91c1c;font-weight:bold;">NO (No autorizado - Solo Chanak Foundation)</span>'}</p>
              <p><strong>URL de Origen:</strong> ${payload.source_url || 'N/A'}</p>
              <p><strong>Fecha / Hora:</strong> ${payload.created_at}</p>
            `
          })
        });

        if (emailResponse.ok) {
          console.log('[Resend] Email notification successfully delivered to info@chanakfoundation.org');
          emailDispatched = true;
        } else {
          const emailErr = await emailResponse.text();
          console.error('[Resend Error]', emailResponse.status, emailErr);
        }
      } catch (emailErr) {
        console.error('[Resend Network Error]', emailErr);
      }
    } else {
      console.warn('[Resend Warning] RESEND_API_KEY not configured.');
    }

    // 5. Always log structured inquiry to serverless execution logs
    console.log('[ORIENTATION_INQUIRY_RECEIVED]', JSON.stringify({
      guardian_name: payload.guardian_name,
      guardian_email: payload.guardian_email,
      state_code: payload.state_code,
      grade_range: payload.grade_range,
      preferred_language: payload.preferred_language,
      academy_contact_consent: payload.academy_contact_consent,
      locale: payload.locale,
      timestamp: payload.created_at,
      saved_in_supabase: savedInSupabase,
      email_dispatched: emailDispatched
    }));

    // Return success 200 so form submission and Google Ad Grants conversion tracking proceed reliably
    return res.status(200).json({
      success: true,
      message: 'Orientation inquiry submitted successfully',
      saved_in_supabase: savedInSupabase,
      email_dispatched: emailDispatched
    });
  } catch (err) {
    console.error('[Server Error in submit-orientation]', err);
    return res.status(500).json({
      success: false,
      error: 'No pudimos guardar tu solicitud, escríbenos a info@chanakfoundation.org'
    });
  }
};
