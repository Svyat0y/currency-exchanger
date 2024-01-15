import styles from "@/components/header/exchangeInfo/exchangeInfo.module.scss"
import {Icon} from "@/components/icon"
import classNames from "classnames"
import {formatNumber} from "@/utils/helpers"
import Image from "next/image"
import {FC, useEffect, useState} from "react"
import {useExchangeContext} from "@/context/exchangeContext"

type GetValueBoxProps = {
	noActive: boolean
}

export const GetValueBox: FC<GetValueBoxProps> = ({noActive}) => {
	const [getValue, setGetValue] = useState('0')
	const {getItem, getValue: getValueContext} = useExchangeContext()
	const [isSuccessRate, setIsSuccessRate] = useState(false)

	useEffect(() => {
		const cardValues = localStorage.getItem('cardValue')

		if(cardValues) {
			const {getValue} = JSON.parse(cardValues)
			setGetValue(getValue)
		}
	}, [])

	return (
		<div className={styles.box}>
			<button className={classNames(styles.getValueBtn, {[styles.noActive]: noActive})} aria-label='getValueButton'
			        onClick={() => setIsSuccessRate(!isSuccessRate)}>
				{!noActive
					? <Icon type='POLYGON' className={classNames(styles.icon, {
						[styles.success]: isSuccessRate,
					})}/>
					: ''}
				<span className={classNames(styles.getValue, {
					[styles.success]: noActive || isSuccessRate
				})}>{`${formatNumber(getValueContext || getValue, 5)} ${getItem?.shortLabel}`} </span>
			</button>
			<Image src={getItem?.icon} alt={''} width={16} height={16}/>
		</div>
	)
}