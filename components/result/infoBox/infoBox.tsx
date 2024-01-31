import styles from './infoBox.module.scss'
import {HeaderInfo} from "./headerInfo/headerInfo"
import {TransactionInfo} from "./transactionInfo/transactionInfo"
import {FooterInfo} from "./footerInfo/footerInfo"
import classNames from "classnames"
import {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from "react"
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
	const fakeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [positionFixedBtn, setPositionFixedBtn] = useState<{top: number | null}>({ top: 0 })

	useEffect(() => {
		const updatePosition = () => {
			if (fakeBtnRef?.current) {
				setTimeout(() => {
					const positionTop = fakeBtnRef?.current && fakeBtnRef.current.getBoundingClientRect().top
					setPositionFixedBtn({ top: positionTop })
				})
			}
		}

		const handleResize = () => {
			updatePosition()
		}

		const handleScroll = () => {
			updatePosition()
		}

		const parentElement = document.getElementById('parentElementId')

		if (parentElement) {
			parentElement.addEventListener('transitionend', updatePosition)
		}

		window.addEventListener('resize', handleResize)
		document.body.addEventListener('scroll', handleScroll)

		return () => {
			if (parentElement) {
				parentElement.removeEventListener('transitionend', updatePosition)
			}

			window.removeEventListener('resize', handleResize)
			document.body.removeEventListener('scroll', handleScroll)
		};
	}, [fakeBtnRef.current, isAllSuccess, isDepositStatus, isConfirmationStatus, isExchangeStatus])

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
		<>
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
				{!isAllSuccess && <FooterInfo isAllSuccess={isAllSuccess} active={isConfirmationStatus || isExchangeStatus} handleOpenModal={handleOpenModal}/>}
				<ModalContent
					isModalOpen={isModalOpen}
					currentModal={currentModal}
					handleCloseModal={handleCloseModal}
					isAllSuccess={isAllSuccess}
					confirmCount={confirmCount}
				/>
				<button ref={fakeBtnRef} className={classNames(styles.fakeBtn, {
					[styles.active]: !!currentStatus && !isShowRightBox,
					[styles.isAllSuccess]: isAllSuccess,
				})}></button>
			</div>
				<AiBtnWr positionFixedBtn={positionFixedBtn} handleOpenRightBox={handleOpenRightBox} active={!isShowRightBox && !!currentStatus && !isDepositStatus}/>
		</>
	)
}