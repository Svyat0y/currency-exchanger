import styles from "@/components/header/exchangeInfo/exchangeInfo.module.scss"
import Image from "next/image"
import {useExchangeContext} from "@/context/exchangeContext"

export const SendValueBox = () => {
	const {sendItem, sendValue} = useExchangeContext()

	return (
		<div className={styles.box}>
			<Image src={sendItem?.icon} alt={''} width={16} height={16}/>
			<span className={styles.sendValue}>{`${sendValue} ${sendItem?.shortLabel}`}</span>
		</div>
	)
}