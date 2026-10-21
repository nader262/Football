'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Home() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlayers() {
      const { data, error } = await supabase.from('players').select('*')
      if (data) setPlayers(data)
      setLoading(false)
    }
    fetchPlayers()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: '#10B981', textAlign: 'center' }}>⚽ تطبيق إدارة الفريق</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>أهلاً بك يا كابتن! التطبيق متصل بنجاح بقاعدة البيانات.</p>
      
      <div style={{ marginTop: '30px', background: '#f3f4f6', padding: '15px', borderRadius: '10px' }}>
        <h3>قائمة اللاعبين:</h3>
        {loading ? (
          <p>جاري تحميل البيانات...</p>
        ) : players.length === 0 ? (
          <p>لا يوجد لاعبين مضافين حالياً في قاعدة البيانات.</p>
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
