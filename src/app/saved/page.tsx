'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import TrademarkItem from '@/components/TrademarkItem'
import { useFavoriteStore } from '@/store/favoriteStore'
import Modal from '@/components/Modal'
import styles from '../page.module.css'

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

export default function SavedPage() {
  const [data, setData] = useState<Trademark[]>([])
  const favorites = useFavoriteStore((state) => state.favorites)
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Trademark | null>(null)

  useEffect(() => {
    fetch('/data/trademark_sample.json')
      .then((res) => res.json())
      .then((json: Trademark[]) => {
        const filtered = json.filter((item) =>
          favorites.includes(item.applicationNumber)
        )
        setData(filtered)
      })
      .catch(() => setData([]))
  }, [favorites])

  const closeModal = () => {
    setModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <main>
      <div className={styles.topwrap}>
        <div className="icon" onClick={() => router.push('/')}>
          <Image
            src="/images/Arrow_left.svg"
            alt="뒤로가기"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h1>보관함</h1>
      </div>

      {data.length === 0 ? (
        <p>저장된 항목이 없습니다.</p>
      ) : (
        data.map((item, idx) => (
          <TrademarkItem
            key={idx}
            productName={item.productName}
            productNameEng={item.productNameEng}
            applicationNumber={item.applicationNumber}
            applicationDate={item.applicationDate}
            registerStatus={item.registerStatus}
            onClick={() => {
              setSelectedItem(item)
              setModalOpen(true)
            }}
          />
        ))
      )}

      {selectedItem && (
        <Modal
          visible={modalOpen}
          data={selectedItem}
          onClose={closeModal}
        />
      )}
    </main>
  )
}