import styles from './transactionInfo.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import {FC, useEffect, useState} from "react"
import Timer from "@/components/timer/timer"
import {PopupContent} from "./popupContent/popupContent"
import classNames from "classnames"
import {TransactionContent} from "@/components/result/infoBox/transactionInfo/transactionContent"
import {TExchangeInfo} from "@/components/result/infoBox/infoBox"
import {ConfettiWrapper} from "@/components/confetti/confettiWrapper"

type TransactionInfoProps = {
	exchangeInfo?: TExchangeInfo
	walletAddress: string
	isDepositStatus: boolean
	isConfirmationLoading: boolean
	isExchangeStatus: boolean
	isAllSuccess: boolean
	confirmCount: number
}

export const TransactionInfo: FC<TransactionInfoProps> = (
	{
		exchangeInfo,
		walletAddress,
		isDepositStatus,
		isConfirmationLoading,
		isExchangeStatus,
		isAllSuccess,
		confirmCount,
	}) => {
	const [popupIsOpen, setPopupIsOpen] = useState(false)

	useEffect(() => {
		if(!isDepositStatus) setPopupIsOpen(false)
	}, [isDepositStatus])

	return (
		<div className={classNames(styles.wrapper, {
			[styles.popupIsOpen]: popupIsOpen,
			[styles.isConfirmStatus]: isConfirmationLoading || isExchangeStatus,
			[styles.isAllSuccess]: isAllSuccess,
		})}>
			<GradientBorder active={!isConfirmationLoading && !isExchangeStatus && !isAllSuccess} withoutAnim={true}/>
			<div className={styles.contentWrapper}>
				<Timer active={!isAllSuccess} className={styles.transactionTimer} initialMinutes={30} icon='STOPWATCH'/>
				<TransactionContent
					popupIsOpen={popupIsOpen}
					exchangeInfo={exchangeInfo}
					walletAddress={walletAddress}
					setPopupIsOpen={setPopupIsOpen}
					isDepositStatus={isDepositStatus}
					isConfirmationLoading={isConfirmationLoading}
					isExchangeStatus={isExchangeStatus}
					isAllSuccess={isAllSuccess}
					confirmCount={confirmCount}
				/>
				<PopupContent
					exchangeInfo={exchangeInfo}
					active={popupIsOpen}
					setPopupIsOpen={setPopupIsOpen}
					walletAddress={walletAddress}
				/>
			</div>
			<ConfettiWrapper active={isAllSuccess} width={460} className={styles.successConfetti}/>
		</div>
	)
}