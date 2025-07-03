'use client'

import Image from 'next/image'
import { useFavoriteStore } from '@/store/favoriteStore'
import styles from "./TrademarkItem.module.css"

interface Props {
  productName: string
  productNameEng: string
  applicationNumber: string
  applicationDate: string
  registerStatus: string
}

export default function TrademarkItem({
  productName,
  productNameEng,
  applicationNumber,
  applicationDate,
  registerStatus,
}: Props) {
  // 전역 상태 훅 사용
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)
  const isFavorite = useFavoriteStore((state) =>
    state.favorites.includes(applicationNumber)
  )

  return (
    <div
      className={styles.listwrap}
    >
      <div>
        <Image
        src={isFavorite ? '/images/star_full.svg' : '/images/star.svg'}
        alt="즐겨찾기"
        width={32}
        height={32}
        style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer' }}
        onClick={() => toggleFavorite(applicationNumber)}
      />
      </div>
      

      <div className={styles.title}>
        {productName || '-'}
        {productNameEng && (
          <span>
            ({productNameEng})
          </span>
        )}
      </div>

      <div className={styles.sub}>
        <div>
          출원번호: {applicationNumber || '-'}
        </div>
        <div>
          출원일: {formatDate(applicationDate) || '-'}
        </div>
        <div>상태: {registerStatus || '-'}</div>
      </div>
    </div>
  )
}

function formatDate(dateStr: string) {
  if (dateStr.length !== 8) return dateStr
  return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`
}
