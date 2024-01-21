import styles from './popupContent.module.scss'
import {FC, useState} from "react"
import classNames from "classnames"
import {CloseButton} from "@/components/buttons/closeButton"
import {PopupHeader} from "@/components/result/infoBox/transactionInfo/popupContent/header/popupHeader"
import {InfoTitle} from "@/components/result/infoBox/transactionInfo/infoTitle/infoTitle"
import { QRCode } from 'react-qrcode-logo'
import {TExchangeInfo} from "@/components/result/infoBox/infoBox"
import {GradientText} from "@/components/gradientText/gradientText"
import {useMount} from "@/hooks/useMount"

type PopupContent = {
	active: boolean
	setPopupIsOpen: (state: boolean) => void
	exchangeInfo?: TExchangeInfo
	walletAddress: string
}

export const TABS = {
	qrAddress: 1,
	qrAmount: 2,
}

export const PopupContent: FC<PopupContent> = ({active, setPopupIsOpen, exchangeInfo, walletAddress}) => {
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
			<CloseButton onClick={handleClosePopup}/>
			<PopupHeader activeTab={activeTab} handleClickAddress={handleClickAddress} handleClickAmount={handleClickAmount}/>
			<div className={styles.content}>
				<InfoTitle isPopup sendInfo={exchangeInfo} renderText={<>Send <GradientText>{exchangeInfo?.sendValue} {exchangeInfo?.sendLabel}</GradientText> to the address below</>}/>
				<div className={styles.qrBlockWrapper}>
					<QRCode
						size={200}
						value={activeTab === TABS.qrAddress ? walletAddress : String(exchangeInfo?.sendValue)}
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