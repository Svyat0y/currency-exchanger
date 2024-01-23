import styles from "@/components/header/exchangeInfo/exchangeInfo.module.scss"
import {Icon} from "@/components/icon"
import classNames from "classnames"
import {formatNumber} from "@/utils/helpers"
import Image from "next/image"
import {FC, useEffect, useState} from "react"
import {useExchangeContext} from "@/context/exchangeContext"

type GetValueBoxProps = {
	noActive: boolean
	className?: string
	textColor?: string
}

type GetInfo = {
	value: string
	label: string
	icon: string
} | undefined

export const GetValueBox: FC<GetValueBoxProps> = ({noActive, className, textColor}) => {
	const [getInfo, setGetInfo] = useState<GetInfo>(undefined)
	const {getItem, getValue: getValueContext} = useExchangeContext()
	const [isSuccessRate, setIsSuccessRate] = useState(false)

	useEffect(() => {
		const cardValues = localStorage.getItem('cardsValue')

		if(cardValues) {
			const {getValue, getLabel, getIcon} = JSON.parse(cardValues)
			const obj: GetInfo = {
				value: getValue,
				label: getLabel,
				icon: getIcon
			}
			setGetInfo(obj)
		}
	}, [getItem, getValueContext])

	return (
		<div className={classNames(styles.box, className)}>
			<button className={classNames(styles.getValueBtn, {[styles.noActive]: noActive})} aria-label='getValueButton'
			        onClick={() => setIsSuccessRate(!isSuccessRate)}>
				{!noActive
					? <span className={classNames(styles.icon, {
						[styles.success]: isSuccessRate,
					})}></span>
					: ''}
				<span className={classNames(styles.getValue, {
					[styles.success]: noActive || isSuccessRate
				})}>{`${formatNumber(getInfo?.value || getValueContext, 5)} ${getInfo?.label || getItem?.shortLabel}`} </span>
			</button>
			<Image src={getInfo?.icon || getItem?.icon} alt={''} width={16} height={16}/>
		</div>
	)
}