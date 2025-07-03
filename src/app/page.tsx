'use client'

import { useEffect, useState } from 'react'
import TrademarkItem from '@/components/TrademarkItem'
import styles from "./page.module.css"

interface Trademark {
  productName: string
  productNameEng: string
  applicationNumber: string
  applicationDate: string
  registerStatus: string
  publicationNumber: string
  publicationDate: string
  registrationNumber: string[] | null
  registrationDate: string[] | null
}

export default function Home() {
  const [data, setData] = useState<Trademark[]>([])
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    fetch('/data/trademark_sample.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => setData([]))
  }, [])

  const filteredData = search
    ? data.filter(item => {
      const name = (item.productName || '').toLowerCase()
      const nameEng = (item.productNameEng || '').toLowerCase()
      return name.includes(search.toLowerCase()) || nameEng.includes(search.toLowerCase())
    })
    : []

  const suggestions = query
    ? data
      .filter(item => {
        const name = item.productName?.toLowerCase() || ''
        const nameEng = item.productNameEng?.toLowerCase() || ''
        return (
          name.includes(query.toLowerCase()) ||
          nameEng.includes(query.toLowerCase())
        )
      })
      .slice(0, 5) // 최대 5개
    : []

  return (
    <main>
      <div className={styles.topwrap}>
        <div className={styles.inputwrap}>
          <input
            type="text"
            placeholder="상표명 또는 영문명을 입력하세요"
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className={styles.input}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setSearch(query)
                setShowSuggestions(false)
              }
            }}
          />

          {/* 자동완성 리스트 */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              className={styles.ul}
            >
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  onMouseDown={() => {
                    setQuery(item.productName)
                    setSearch(item.productName)
                    setShowSuggestions(false)
                  }}
                  className={styles.li}
                >
                  {item.productName}
                  {item.productNameEng && (
                    <span style={{ color: '#888', marginLeft: 8 }}>
                      ({item.productNameEng})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          onClick={() => setSearch(query)}
          className={styles.btn}
        >
          검색
        </div>
        <div
          onClick={() => (window.location.href = '/saved')}
          className={styles.btn}
        >
          보관함
        </div>
      </div>

      {search && filteredData.length === 0 && <p>검색 결과가 없습니다.</p>}

      {filteredData.map((item, idx) => (
        <TrademarkItem
          key={idx}
          productName={item.productName}
          productNameEng={item.productNameEng}
          applicationNumber={item.applicationNumber}
          applicationDate={item.applicationDate}
          registerStatus={item.registerStatus}
        />
      ))}
    </main>
  )
}