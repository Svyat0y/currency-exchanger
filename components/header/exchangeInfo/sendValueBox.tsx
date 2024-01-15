import styles from "@/components/header/exchangeInfo/exchangeInfo.module.scss"
import Image from "next/image"
import {useExchangeContext} from "@/context/exchangeContext"
import {formatNumber} from "@/utils/helpers"
import {useEffect, useState} from "react"

export const SendValueBox = () => {
	const [sendValue, setSendValue] = useState('0')
	const {sendItem, sendValue: sendValueContext} = useExchangeContext()

	useEffect(() => {
		const cardValues = localStorage.getItem('cardsValue')

		if(cardValues) {
			const {sendValue} = JSON.parse(cardValues)
			setSendValue(sendValue)
		}
	}, [])

	return (
		<div className={styles.box}>
			<Image src={sendItem?.icon} alt={''} width={16} height={16}/>
			<span className={styles.sendValue}>{`${formatNumber(sendValueContext || sendValue, 5)} ${sendItem?.shortLabel}`}</span>
		</div>
	)
}