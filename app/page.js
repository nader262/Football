'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlayers() {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          setLoading(false)
          return
        }
        const { data } = await supabase.from('players').select('*')
        if (data) setPlayers(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPlayers()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#10B981' }}>⚽ تطبيق إدارة الفريق</h1>
      <p style={{ color: '#666' }}>أهلاً بك يا كابتن! التطبيق جاهز ويعمل بنجاح.</p>
      
      <div style={{ marginTop: '30px', background: '#f3f4f6', padding: '15px', borderRadius: '10px', textAlign: 'right' }}>
        <h3>قائمة اللاعبين:</h3>
        {loading ? (
          <p style={{ textAlign: 'center' }}>جاري تحميل البيانات...</p>
        ) : players.length === 0 ? (
          <p style={{ textAlign: 'center' }}>لا يوجد لاعبين مضافين حالياً في قاعدة البيانات.</p>
        ) : (
          <ul>
            {players.map((p) => (
              <li key={p.id}>{p.name} - {p.position}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
