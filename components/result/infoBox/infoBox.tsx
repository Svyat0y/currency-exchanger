import styles from './infoBox.module.scss'
import {HeaderInfo} from "./headerInfo/headerInfo"
import {TransactionInfo} from "./transactionInfo/transactionInfo"
import {FooterInfo} from "./footerInfo/footerInfo"
import classNames from "classnames"
import {FC, useEffect, useState} from "react"
import {STATUS, WAITING_STATUSES} from "@/context/statusContext"
import {ModalContent} from "@/components/result/infoBox/modalContent/modalContent"
import {useNotificationContext} from "@/context/notificationContext"

type InfoBoxProps = {
	currentStatus: string
	isAllSuccess: boolean
	isInteractionWithRightBox: boolean
	updateState?: (wStatus: string, status: string) => void
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
		isInteractionWithRightBox,
		isAllSuccess,
		updateState
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
			}, 3000)
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
			[styles.animStart]: isConfirmationStatus || isInteractionWithRightBox,
		})}>
			<HeaderInfo isAllSuccess={isAllSuccess}/>
			<TransactionInfo
				confirmCount={confirmCount}
				isConfirmationLoading={isConfirmationStatus}
				isExchangeStatus={isExchangeStatus}
				isDepositStatus={isDepositStatus}
				exchangeInfo={exchangeInfo}
				walletAddress={String(walletAddress)}
				isAllSuccess={isAllSuccess}
				handleOpenModal={handleOpenModal}
			/>
			<FooterInfo active={isConfirmationStatus || isExchangeStatus} handleOpenModal={handleOpenModal}/>
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