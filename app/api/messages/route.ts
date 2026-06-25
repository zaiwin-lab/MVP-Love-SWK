import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, SARAWAK_COORDS } from '@/lib/countries'

function getCoords(country: string, city: string): { lat: number; lng: number } {
  // Try to find exact country match
  const found = COUNTRIES.find(c => c.name.toLowerCase() === country.toLowerCase())
  if (found) return { lat: found.lat, lng: found.lng }
  // Default to Sarawak
  return SARAWAK_COORDS
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  try {
    // Check if supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      return NextResponse.json({
        messages: [],
        total: 0,
        countriesCount: 0,
        citiesCount: 0,
        countryStats: [],
        cityStats: [],
        wordStats: [],
      })
    }

    if (!supabase) {
      return NextResponse.json({ messages: [], total: 0, countriesCount: 0, citiesCount: 0, countryStats: [], cityStats: [], wordStats: [] })
    }

    const [messagesRes, countRes] = await Promise.all([
      supabase
        .from('messages')
        .select('*')
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1),
      supabase
        .from('messages')
        .select('id, country, city, one_word', { count: 'exact' })
        .eq('approval_status', 'approved'),
    ])

    const messages = messagesRes.data || []
    const allMessages = countRes.data || []
    const total = countRes.count || 0

    // Country stats
    const countryMap: Record<string, number> = {}
    const cityMap: Record<string, number> = {}
    const wordMap: Record<string, number> = {}

    for (const m of allMessages) {
      if (m.country) countryMap[m.country] = (countryMap[m.country] || 0) + 1
      if (m.city) cityMap[m.city] = (cityMap[m.city] || 0) + 1
      if (m.one_word) {
        const w = m.one_word.trim().toLowerCase()
        if (w) wordMap[w] = (wordMap[w] || 0) + 1
      }
    }

    const countryStats = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }))

    const cityStats = Object.entries(cityMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }))

    const wordStats = Object.entries(wordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word, count]) => ({ word, count }))

    return NextResponse.json({
      messages,
      total,
      countriesCount: Object.keys(countryMap).length,
      citiesCount: Object.keys(cityMap).length,
      countryStats,
      cityStats,
      wordStats,
    })
  } catch (error) {
    console.error('GET /api/messages error:', error)
    return NextResponse.json({
      messages: [],
      total: 0,
      countriesCount: 0,
      citiesCount: 0,
      countryStats: [],
      cityStats: [],
      wordStats: [],
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, country, city, district, one_word, message } = body

    if (!country || !city || !message) {
      return NextResponse.json({ error: 'Country, city, and message are required.' }, { status: 400 })
    }

    if (message.length > 300) {
      return NextResponse.json({ error: 'Message must be 300 characters or less.' }, { status: 400 })
    }

    const coords = getCoords(country, city)

    if (!supabase) {
      return NextResponse.json({ success: true, id: 'mock-' + Date.now() })
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({
        name: name || null,
        phone: phone || null,
        email: email || null,
        country,
        city,
        district: district || null,
        one_word: one_word || null,
        message,
        latitude: coords.lat,
        longitude: coords.lng,
        approval_status: 'pending',
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('POST /api/messages error:', error)
    return NextResponse.json({ error: 'Failed to save message. Please try again.' }, { status: 500 })
  }
}
