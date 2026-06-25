'use client'
import { useState, useEffect } from 'react'
import { type Message } from '@/lib/supabase'

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [status, setStatus] = useState<'pending' | 'approved' | 'hidden'>('pending')
  const [loading, setLoading] = useState(false)
  const [actionMsg, setActionMsg] = useState('')

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthenticated(true)
  }

  const fetchMessages = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin?status=${status}`, {
      headers: { 'x-admin-secret': secret },
    })
    const data = await res.json()
    setMessages(data.messages || [])
    setLoading(false)
  }

  useEffect(() => {
    if (authenticated) fetchMessages()
  }, [authenticated, status])

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ id, approval_status: newStatus }),
    })
    setActionMsg(`Message ${newStatus}!`)
    setTimeout(() => setActionMsg(''), 2000)
    fetchMessages()
  }

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return
    await fetch(`/api/admin?id=${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret },
    })
    fetchMessages()
  }

  const exportCSV = () => {
    const headers = ['id', 'name', 'email', 'phone', 'country', 'city', 'district', 'one_word', 'message', 'approval_status', 'created_at']
    const rows = messages.map(m => headers.map(h => JSON.stringify((m as Record<string, unknown>)[h] ?? '')).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `messages-${status}-${Date.now()}.csv`
    a.click()
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,215,0,0.2)',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#f5f0e8',
    fontSize: '0.95rem',
    width: '100%',
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 400, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 16, padding: '2.5rem' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#ffd700', marginBottom: '1.5rem', textAlign: 'center' }}>
            Admin Dashboard
          </h1>
          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Admin secret"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              style={{ ...inputStyle, marginBottom: '1rem' }}
            />
            <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #cc0000, #ff2200)', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', padding: '2rem', color: '#f5f0e8' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#ffd700', fontSize: '1.8rem' }}>
            ❤️ Admin Dashboard
          </h1>
          <button onClick={exportCSV} style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid #ffd700', color: '#ffd700', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontWeight: 600 }}>
            Export CSV
          </button>
        </div>

        {actionMsg && (
          <div style={{ background: 'rgba(0,200,0,0.15)', border: '1px solid #00c800', borderRadius: 8, padding: '10px 16px', marginBottom: '1rem', color: '#00e600' }}>
            {actionMsg}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          {(['pending', 'approved', 'hidden'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                background: status === s ? '#cc0000' : 'rgba(255,255,255,0.05)',
                color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontWeight: status === s ? 700 : 400, textTransform: 'capitalize',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: '#666' }}>Loading...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.length === 0 && <p style={{ color: '#666' }}>No {status} messages.</p>}
            {messages.map(m => (
              <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#ffd700', fontWeight: 600 }}>{m.name || 'Anonymous'}</span>
                  <span style={{ color: '#888' }}>📍 {m.city}, {m.country}</span>
                  <span style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(m.created_at).toLocaleDateString()}</span>
                  {m.email && <span style={{ color: '#666', fontSize: '0.85rem' }}>{m.email}</span>}
                </div>
                <p style={{ color: '#d4ccc0', marginBottom: '1rem', lineHeight: 1.6 }}>{m.message}</p>
                {m.one_word && <span style={{ background: 'rgba(204,0,0,0.2)', color: '#ff9999', borderRadius: 6, padding: '3px 10px', fontSize: '0.8rem', marginBottom: '0.75rem', display: 'inline-block' }}>Word: {m.one_word}</span>}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {status !== 'approved' && (
                    <button onClick={() => updateStatus(m.id, 'approved')} style={{ background: '#00780a', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontWeight: 600 }}>Approve</button>
                  )}
                  {status !== 'hidden' && (
                    <button onClick={() => updateStatus(m.id, 'hidden')} style={{ background: '#555', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Hide</button>
                  )}
                  {status !== 'pending' && (
                    <button onClick={() => updateStatus(m.id, 'pending')} style={{ background: '#333', color: '#ccc', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Set Pending</button>
                  )}
                  <button onClick={() => deleteMsg(m.id)} style={{ background: '#cc0000', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
