'use client'

import React from 'react'
import Image from 'next/image'
import styles from "./Modal.module.css"

interface ModalProps {
    visible?: boolean
    onClose: () => void
    data: {
        productName: string
        productNameEng: string
        applicationNumber: string
        applicationDate: string
        registerStatus: string
        publicationNumber: string
        publicationDate: string
        registrationNumber: string[] | null
        registrationDate: string[] | null
        internationalRegNumbers?: string[]
        internationalRegDate?: string
        priorityClaimNumList?: string[]
        priorityClaimDateList?: string[]
        asignProductMainCodeList?: string[]
        asignProductSubCodeList?: string[]
        viennaCodeList?: string[]
    }
}

export default function Modal({ visible, onClose, data }: ModalProps) {
    if (!visible) return null

    const formatDate = (dateStr?: string) => {
        if (!dateStr || dateStr.length !== 8) return dateStr || '-'
        return dateStr
    }

    const formatArray = (arr?: string[] | null) =>
        arr && arr.length > 0 ? arr.join(', ') : '-'

    return (
        <div
            className={styles.bg}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    onClick={onClose}
                    className={styles.close}
                >
                    <Image
                        src="/images/x.svg"
                        alt="창닫기"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                <h2>
                    {data.productName} ({data.productNameEng || '-'})
                </h2>
                <ul className={styles.list}>
                    <li>
                        <span>출원 번호</span>
                        <div>{data.applicationNumber || '-'}</div>
                    </li>
                    <li>
                        <span>출원일</span>
                        <div>{formatDate(data.applicationDate)}</div>
                    </li>
                    <li>
                        <span>상태</span>
                        <div>{data.registerStatus || '-'}</div>
                    </li>
                    <li>
                        <span>공고 번호</span>
                        <div>{data.publicationNumber || '-'}</div>
                    </li>
                    <li>
                        <span>공고일</span>
                        <div>{formatDate(data.publicationDate)}</div>
                    </li>
                    <li>
                        <span>등록 번호</span>
                        <div>{formatArray(data.registrationNumber)}</div>
                    </li>
                    <li>
                        <span>등록일</span>
                        <div>{formatArray(data.registrationDate)}</div>
                    </li>
                    <li>
                        <span>국제출원번호</span>
                        <div>{formatArray(data.internationalRegNumbers)}</div>
                    </li>
                    <li>
                        <span>국제출원일</span>
                        <div>{formatDate(data.internationalRegDate)}</div>
                    </li>
                    <li>
                        <span>우선권 번호</span>
                        <div>{formatArray(data.priorityClaimNumList)}</div>
                    </li>
                    <li>
                        <span>우선권 일자</span>
                        <div>{formatArray(data.priorityClaimDateList)}</div>
                    </li>
                    <li>
                        <span>상품 주 분류 코드 리스트</span>
                        <div>{formatArray(data.asignProductMainCodeList)}</div>
                    </li>
                    <li>
                        <span>상품 유사군 코드 리스트</span>
                        <div>{formatArray(data.asignProductSubCodeList)}</div>
                    </li>
                    <li>
                        <span>비엔나 코드 리스트</span>
                        <div>{formatArray(data.viennaCodeList)}</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}