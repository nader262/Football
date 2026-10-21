'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export default function Home() {
  const [players, setPlayers] = useState([])
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (supabase) {
      fetchPlayers()
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchPlayers() {
    try {
      const { data, error } = await supabase.from('players').select('*')
      if (error) console.error(error)
      else setPlayers(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function addPlayer(e) {
    e.preventDefault()
    if (!name.trim()) return
    if (!supabase) {
      alert('قاعدة البيانات غير متصلة بشكل صحيح!')
      return
    }

    const { data, error } = await supabase
      .from('players')
      .insert([{ name, position }])
      .select()

    if (error) {
      alert('خطأ أثناء الإضافة: ' + error.message)
    } else {
      if (data) setPlayers([...players, ...data])
      setName('')
      setPosition('')
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }} dir="rtl">
      <h1 style={{ color: '#10B981', textAlign: 'center' }}>⚽ إدارة فريق الشباب</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>أهلاً بك يا كابتن في تطبيقك الخاص!</p>

      {/* نموذج إضافة لاعب جديد */}
      <form onSubmit={addPlayer} style={{ background: '#f3f4f6', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3 style={{ marginTop: '0', fontSize: '18px' }}>إضافة لاعب جديد:</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="اسم اللاعب"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="المركز (مثال: مهاجم، دفاع، حارس)"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ background: '#10B981', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          حفظ وإضافة اللاعب
        </button>
      </form>

      {/* قائمة اللاعبين */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '15px', borderRadius: '10px' }}>
        <h3 style={{ marginTop: '0', fontSize: '18px' }}>قائمة اللاعبين ({players.length}):</h3>
        {loading ? (
          <p style={{ textAlign: 'center' }}>جاري التحميل...</p>
        ) : players.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>لا يوجد لاعبين مضافين حالياً.</p>
        ) : (
          <ul style={{ paddingRight: '20px', margin: '0' }}>
            {players.map((p) => (
              <li key={p.id} style={{ marginBottom: '8px' }}>
                <strong>{p.name}</strong> {p.position ? `- ${p.position}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
