import styles from "@/components/header/exchangeInfo/exchangeInfo.module.scss"
import Image from "next/image"
import {useExchangeContext} from "@/context/exchangeContext"
import {formatNumber} from "@/utils/helpers"
import {useEffect, useState} from "react"

type SendInfo = {
	value: string
	label: string
	icon: string
} | undefined

export const SendValueBox = () => {
	const [sendInfo, setSendInfo] = useState<SendInfo>(undefined)
	const {sendItem, sendValue: sendValueContext} = useExchangeContext()

	useEffect(() => {
		const cardValues = localStorage.getItem('cardsValue')

		if(cardValues) {
			const {sendValue, sendLabel, sendIcon} = JSON.parse(cardValues)
			const obj: SendInfo = {
				value: sendValue,
				label: sendLabel,
				icon: sendIcon
			}
			setSendInfo(obj)
		}
	}, [sendItem, sendValueContext])

	return (
		<div className={styles.box}>
			<Image src={sendInfo?.icon || sendItem?.icon} alt={''} width={16} height={16}/>
			<span className={styles.sendValue}>{`${formatNumber(sendInfo?.value || sendValueContext, 5)} ${sendInfo?.label || sendItem?.shortLabel}`}</span>
		</div>
	)
}