import styles from './infoBox.module.scss'
import {HeaderInfo} from "./headerInfo/headerInfo"
import {TransactionInfo} from "./transactionInfo/transactionInfo"
import {FooterInfo} from "./footerInfo/footerInfo"
import classNames from "classnames"
import {FC, useEffect, useState} from "react"

type InfoBoxProps = {
	isConfirmationLoading: boolean
}

export const InfoBox: FC<InfoBoxProps> = ({isConfirmationLoading}) => {
	const [sendValue, setSendValue] = useState('0')
	const walletAddress = "0xba72b008d53d3e12345678901234567890abcd"

	useEffect(() => {
		const cardValues = localStorage.getItem('cardsValue')

		if(cardValues) {
			const {sendValue} = JSON.parse(cardValues)
			setSendValue(sendValue)
		}
	}, [])


	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: isConfirmationLoading,
		})}>
			<HeaderInfo/>
			<TransactionInfo sendValue={sendValue} walletAddress={walletAddress}/>
			<FooterInfo/>
		</div>
	)
}