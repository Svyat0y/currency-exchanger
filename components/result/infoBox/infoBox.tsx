import styles from './infoBox.module.scss'
import {HeaderInfo} from "./headerInfo/headerInfo"
import {TransactionInfo} from "./transactionInfo/transactionInfo"
import {FooterInfo} from "./footerInfo/footerInfo"
import classNames from "classnames"
import {FC, useEffect, useState} from "react"
import {STATUS, WAITING_STATUSES} from "@/context/statusContext"

type InfoBoxProps = {
	currentStatus: string
	updateState?: (title: string, state: string) => void
}

export type TExchangeInfo = Record<string, string>

export const InfoBox: FC<InfoBoxProps> = ({currentStatus, updateState}) => {
	const isDepositStatus = currentStatus === WAITING_STATUSES.deposit
	const isConfirmationStatus = currentStatus === WAITING_STATUSES.confirmations
	const isExchangeStatus = currentStatus === WAITING_STATUSES.exchange
	const isAllSuccess = currentStatus === STATUS.success
	const [exchangeInfo, setExchangeInfo] = useState<TExchangeInfo>()
	const walletAddress = "0xba72b008d53d3e12345678901234567890abcd"

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

	// useEffect(() => {
	// 	let timout: any
	//
	// 	timout = setTimeout(() => {
	// 		updateState && updateState(WAITING_STATUSES.confirmations, STATUS.loading)
	// 	}, 5000)
	//
	// 	return () => {
	// 		clearTimeout(timout)
	// 	}
	// }, [])


	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: isConfirmationStatus,
		})}>
			<HeaderInfo/>
			<TransactionInfo
				isConfirmationLoading={isConfirmationStatus}
				isExchangeStatus={isExchangeStatus}
				isDepositStatus={isDepositStatus}
				exchangeInfo={exchangeInfo}
				walletAddress={String(walletAddress)}
				isAllSuccess={isAllSuccess}
			/>
			<FooterInfo active={isConfirmationStatus || isExchangeStatus}/>
		</div>
	)
}