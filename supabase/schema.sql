-- Messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT,
  one_word TEXT,
  message TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'hidden')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  referral_code TEXT,
  CONSTRAINT message_max_length CHECK (char_length(message) <= 300)
);

-- Indexes
CREATE INDEX idx_messages_status ON messages(approval_status);
CREATE INDEX idx_messages_country ON messages(country);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

-- RLS Policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert
CREATE POLICY "Anyone can submit messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Only approved messages visible to public
CREATE POLICY "Public can view approved messages" ON messages
  FOR SELECT USING (approval_status = 'approved');
