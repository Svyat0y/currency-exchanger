import styles from './transactionInfo.module.scss'
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"
import {GradientBorder} from "@/components/gradientBorder"
import travelExplore from './media/travelExplore.gif'
import {IconGif} from "@/components/icon/iconGif"
import {FC} from "react"
import {InfoTitle} from "./infoTitle/infoTitle"
import {Navigation} from "./navigation/navigation"
import {formatWalletAddress} from "@/utils/helpers"

type TransactionInfoProps = {
	sendValue: number | string | null
	walletAddress: number | string | null
}

export const TransactionInfo: FC<TransactionInfoProps> = ({sendValue, walletAddress}) => {
	const {updateState} = useContextStatus()
	const formattedAddress = formatWalletAddress(String(walletAddress))

	return (
		<div className={styles.wrapper}>
			<GradientBorder active={true} withoutAnim={true}/>
			<div className={styles.contentWrapper}>
				<div className={styles.content}>
					<IconGif gif={travelExplore}/>
					<InfoTitle sendValue={sendValue}/>
					<div className={styles.wallet}>{formattedAddress}</div>
					<Navigation walletAddress={walletAddress}/>
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
		</div>
	)
}