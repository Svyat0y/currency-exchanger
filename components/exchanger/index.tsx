"use client"

import styles from './exchanger.module.scss'
import {ExchangerCard} from "../exchangerCard"
import {useState} from "react"
import {Icon} from "@/components/icon"

export const CARDS = {
	sendCard: 1,
	getCard: 2
}

export const Exchanger = () => {
	const [activeCard, setActiveCard] = useState(CARDS.sendCard)
	const [sendValue, setSendValue] = useState('')
	const [getValue, setGetValue] = useState('')
	const [wallet, setWallet] = useState('')
	
	return (
		<div className={styles.wrapper}>
			<ExchangerCard
				cardTitle='You Send'
				active={activeCard === CARDS.sendCard}
			/>
			<button className={styles.switchArrows}>
				<Icon type='SWITCH_ARROWS'/>
			</button>
			<ExchangerCard
				cardTitle='You Get'
				active={activeCard === CARDS.getCard}
				isTriggerTooltip
			/>
		</div>
	)
}