"use client"

import styles from './exchangeInfo.module.scss'
import classNames from "classnames"
import {Icon} from "@/components/icon"
import {useExchangeContext} from "@/context/exchangeContext"
import {RATES} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher"
import {GetValueBox} from "@/components/header/exchangeInfo/getValueBox"
import {SendValueBox} from "@/components/header/exchangeInfo/sendValueBox"

export const ExchangeInfo = () => {
	const {rateState} = useExchangeContext()
	const isFixedRate = rateState === RATES.fixed

	return (
		<div className={classNames(styles.exchangeInfo, {
			[styles.active]: true
		})}>
			<div className={styles.left}>
				<SendValueBox/>
				<GetValueBox/>
			</div>
			<button aria-label='rate button' className={styles.rateBox}>
				<Icon type={isFixedRate ? 'LOCK' : 'WATER'} fill={isFixedRate ? '#28C600': 'rgba(0, 0, 0, .3)'} />
			</button>
		</div>
	)
}