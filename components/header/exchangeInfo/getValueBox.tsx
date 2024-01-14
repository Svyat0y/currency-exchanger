import styles from "@/components/header/exchangeInfo/exchangeInfo.module.scss"
import {Icon} from "@/components/icon"
import classNames from "classnames"
import {formatNumber} from "@/utils/helpers"
import Image from "next/image"
import {useState} from "react"
import {useExchangeContext} from "@/context/exchangeContext"

export const GetValueBox = () => {
	const {getItem, getValue} = useExchangeContext()
	const [isSuccessRate, setIsSuccessRate] = useState(false)

	return (
		<div className={styles.box}>
			<button className={styles.getValueBtn} aria-label='getValueButton'
			        onClick={() => setIsSuccessRate(!isSuccessRate)}>
				<Icon type='POLYGON' className={classNames(styles.icon, {
					[styles.success]: isSuccessRate
				})}/>
				<span className={classNames(styles.getValue, {
					[styles.success]: isSuccessRate
				})}>{`${formatNumber(getValue, 5)} ${getItem?.shortLabel}`} </span>
			</button>
			<Image src={getItem?.icon} alt={''} width={16} height={16}/>
		</div>
	)
}