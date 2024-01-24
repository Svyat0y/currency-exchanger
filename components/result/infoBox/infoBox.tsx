import styles from './infoBox.module.scss'
import {HeaderInfo} from "./headerInfo/headerInfo"
import {TransactionInfo} from "./transactionInfo/transactionInfo"
import {FooterInfo} from "./footerInfo/footerInfo"
import classNames from "classnames"
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react"
import {STATUS, WAITING_STATUSES} from "@/context/statusContext"
import {ModalContent} from "@/components/result/infoBox/modalContent/modalContent"
import {useNotificationContext} from "@/context/notificationContext"
import {AiBtnWr} from "@/components/result/infoBox/aiBtnWr"

type InfoBoxProps = {
	currentStatus: string
	isAllSuccess: boolean
	isShowRightBox: boolean
	updateState?: (wStatus: string, status: string) => void
	setIsShowRightBox: Dispatch<SetStateAction<boolean>>
}

export const MODALS = {
	transactions: 1,
	logs: 2,
	faqs: 3,
}

export type TExchangeInfo = Record<string, string>

export const InfoBox: FC<InfoBoxProps> = (
	{
		currentStatus,
		isShowRightBox,
		isAllSuccess,
		updateState,
		setIsShowRightBox
	}) => {
	const {setIsOverlay} = useNotificationContext()
	const isDepositStatus = currentStatus === WAITING_STATUSES.deposit
	const isConfirmationStatus = currentStatus === WAITING_STATUSES.confirmations
	const isExchangeStatus = currentStatus === WAITING_STATUSES.exchange
	const [exchangeInfo, setExchangeInfo] = useState<TExchangeInfo>()
	const walletAddress = "0xba72b008d53d3e12345678901234567890abcd"
	const [confirmCount, setConfirmCount] = useState(1)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentModal, setCurrentModal] = useState(MODALS.faqs)
	const [popupIsOpen, setPopupIsOpen] = useState(false)

	useEffect(() => {
		let intervalId: any = null

		if (isConfirmationStatus) {
			if (confirmCount >= 10) {
				updateState && updateState(WAITING_STATUSES.exchange, STATUS.loading)
				clearInterval(intervalId)
				return
			}

			intervalId = window.setInterval(() => {
				setConfirmCount((prevCount) => prevCount + 1)
			}, 300000)
		}

		return () => {
			if (intervalId !== null) clearInterval(intervalId)
		}
	}, [isConfirmationStatus, confirmCount])

	useEffect(() => {
		const cardValues = localStorage.getItem('cardsValue')

		if(cardValues) {
			const {sendValue, sendLabel, getValue, getLabel} = JSON.parse(cardValues)
			setExchangeInfo({
				sendValue,
				sendLabel,
				getValue,
				getLabel
			})
		}
	}, [])

	useEffect(() => {
		if(isAllSuccess) handleCloseModal()
	}, [isAllSuccess])

	const handleOpenRightBox = () => {
		setIsShowRightBox(true)
	}

	const handleOpenModal = (modal: number) => {
		setCurrentModal(modal)
		setIsModalOpen(true)
		setIsOverlay(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setIsOverlay(false)
	}

	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: isShowRightBox,
		})}>
			<HeaderInfo isAllSuccess={isAllSuccess || popupIsOpen}/>
			<TransactionInfo
				confirmCount={confirmCount}
				isConfirmationLoading={isConfirmationStatus}
				isExchangeStatus={isExchangeStatus}
				isDepositStatus={isDepositStatus}
				exchangeInfo={exchangeInfo}
				walletAddress={String(walletAddress)}
				isAllSuccess={isAllSuccess}
				handleOpenModal={handleOpenModal}
				popupIsOpen={popupIsOpen}
				setPopupIsOpen={setPopupIsOpen}
			/>
			<FooterInfo active={isConfirmationStatus || isExchangeStatus} handleOpenModal={handleOpenModal}/>
			<AiBtnWr handleOpenRightBox={handleOpenRightBox} active={!isShowRightBox}/>
			<ModalContent
				isModalOpen={isModalOpen}
				currentModal={currentModal}
				handleCloseModal={handleCloseModal}
				isAllSuccess={isAllSuccess}
				confirmCount={confirmCount}
			/>
		</div>
	)
}