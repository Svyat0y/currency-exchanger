import styles from './popupContent.module.scss'
import {FC, useState} from "react"
import classNames from "classnames"
import {CloseButton} from "@/components/buttons/closeButton"
import {PopupHeader} from "@/components/result/infoBox/transactionInfo/popupContent/header/popupHeader"
import {InfoTitle} from "@/components/result/infoBox/transactionInfo/infoTitle/infoTitle"
import { QRCode } from 'react-qrcode-logo'

type PopupContent = {
	active: boolean
	setPopupIsOpen: (state: boolean) => void
	sendValue: string | number | null
	walletAddress: string
}

export const TABS = {
	qrAddress: 1,
	qrAmount: 2,
}

export const PopupContent: FC<PopupContent> = ({active, setPopupIsOpen, sendValue, walletAddress}) => {
	const [activeTab, setActiveTab] = useState(TABS.qrAddress)

	const handleClickAddress = () => {
		setActiveTab(TABS.qrAddress)
	}

	const handleClickAmount = () => {
		setActiveTab(TABS.qrAmount)
	}

	const handleClosePopup = () => {
		setPopupIsOpen(false)
	}

	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: active
		})}>
			<CloseButton onClick={handleClosePopup} className={styles.customClose}/>
			<PopupHeader activeTab={activeTab} handleClickAddress={handleClickAddress} handleClickAmount={handleClickAmount}/>
			<div className={styles.content}>
				<InfoTitle isPopup sendValue={sendValue}/>
				<div className={styles.qrBlockWrapper}>
					<QRCode
						size={200}
						value={activeTab === TABS.qrAddress ? walletAddress : String(sendValue)}
						eyeRadius={10}
						qrStyle={'dots'}
						quietZone={0}
						bgColor={'#FFFFFF'}
						fgColor={'#000000'}
					/>
				</div>
			</div>
		</div>
	)
}