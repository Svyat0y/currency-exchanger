import styles from './transactionInfo.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import travelExplore from './media/travelExplore.gif'
import {IconGif} from "@/components/icon/iconGif"
import {FC, useState} from "react"
import {InfoTitle} from "./infoTitle/infoTitle"
import {Navigation} from "./navigation/navigation"
import {Truncate} from "@/components/truncate/truncate"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"
import Timer from "@/components/timer/timer"
import {PopupContent} from "./popupContent/popupContent"
import classNames from "classnames"

type TransactionInfoProps = {
	sendValue: number | string | null
	walletAddress: string
}

export const TransactionInfo: FC<TransactionInfoProps> = (
	{
		sendValue,
		walletAddress,
	}) => {
	const [popupIsOpen, setPopupIsOpen] = useState(false)
	const {updateState} = useContextStatus()

	return (
		<div className={classNames(styles.wrapper, {
			[styles.popupIsOpen]: popupIsOpen,
		})}>
			<GradientBorder active={true} withoutAnim={true}/>
			<div className={styles.contentWrapper}>
				<Timer className={styles.transactionTimer} initialMinutes={30} icon='STOPWATCH'/>
				<div className={classNames(styles.content, {
					[styles.hidden]: popupIsOpen,
				})}>
					<IconGif gif={travelExplore}/>
					<InfoTitle sendValue={sendValue}/>
					<Truncate className={styles.walletWrapper} walletAddress={walletAddress}/>
					<Navigation walletAddress={walletAddress} setPopupIsOpen={setPopupIsOpen}/>

				</div>
				<PopupContent sendValue={sendValue} active={popupIsOpen} setPopupIsOpen={setPopupIsOpen} walletAddress={walletAddress}/>




				{/*<div style={{display: 'flex', position: 'absolute', top: '0', gap: '10px'}}>*/}
				{/*	<button style={{border: '1px solid green'}}*/}
				{/*	        onClick={() => updateState && updateState(WAITING_STATUSES.confirmations, STATUS.loading)}>confirmations*/}
				{/*	</button>*/}
				{/*	{' '}*/}
				{/*	<button style={{border: '1px solid green'}}*/}
				{/*	        onClick={() => updateState && updateState(WAITING_STATUSES.exchange, STATUS.loading)}>*/}
				{/*		exchange*/}
				{/*	</button>*/}
				{/*	{' '}*/}
				{/*	<button style={{border: '1px solid green'}}*/}
				{/*	        onClick={() => updateState && updateState(WAITING_STATUSES.exchange, STATUS.success)}>*/}
				{/*		exchange success*/}
				{/*	</button>*/}
				{/*</div>*/}
			</div>
		</div>
	)
}