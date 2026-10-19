-- Chanak Foundation: Orientation Inquiries Table Schema with Row Level Security (RLS)
-- Target Database: Supabase PostgreSQL

CREATE TABLE IF NOT EXISTS public.orientation_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    guardian_name TEXT NOT NULL,
    guardian_email TEXT NOT NULL,
    state_code TEXT NOT NULL,
    grade_range TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'both',
    message TEXT,
    consent_given BOOLEAN NOT NULL DEFAULT false,
    source_url TEXT,
    locale TEXT DEFAULT 'en',
    ip_hash TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orientation_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated frontend clients to INSERT valid inquiries only
CREATE POLICY "Allow anonymous insert of orientation inquiries"
ON public.orientation_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
    guardian_name IS NOT NULL AND length(trim(guardian_name)) > 1 AND
    guardian_email IS NOT NULL AND guardian_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    state_code IS NOT NULL AND
    consent_given = true
);

-- Deny public reading, updating, or deleting (Admin / Service Role only)
CREATE POLICY "Allow authenticated service role read only"
ON public.orientation_inquiries
FOR SELECT
TO service_role
USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orientation_inquiries_state ON public.orientation_inquiries(state_code);
CREATE INDEX IF NOT EXISTS idx_orientation_inquiries_created_at ON public.orientation_inquiries(created_at DESC);
