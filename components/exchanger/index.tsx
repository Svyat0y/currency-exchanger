"use client"

import styles from './exchanger.module.scss'
import {ExchangerCard} from "../exchangerCard"
import {useEffect, useState} from "react"
import {Icon} from "@/components/icon"
import {currencies} from "@/components/exchanger/data"
import {Item} from "@/types/types"

export const CARDS = {
	sendCard: 1,
	getCard: 2
}

export const Exchanger = () => {
	const [activeCard, setActiveCard] = useState(CARDS.sendCard)
	const [sendItem, setSendItem] = useState<Item>(currencies[0].data[0])
	const [getItem, setGetItem] = useState<Item>(currencies[4].data[0])
	const [sendValue, setSendValue] = useState('')
	const [getValue, setGetValue] = useState('')
	const [wallet, setWallet] = useState('')
	const [isCalculatingGetValue, setIsCalculatingGetValue] = useState(false);
	const [isCalculatingSendValue, setIsCalculatingSendValue] = useState(false);

	useEffect(() => {
		let calculationTimeout: any

		if(activeCard === CARDS.sendCard) {
			if(sendValue.length) setIsCalculatingGetValue(true)
			if(sendValue.length === 0) {
				setIsCalculatingGetValue(false)
				setGetValue('')
				return
			}

			calculationTimeout = setTimeout(() => {
				const calculatedValue = (Number(sendValue) * sendItem.price) / getItem.price

				setGetValue(String(calculatedValue))
				setIsCalculatingGetValue(false)
			}, 2000)
		}

		return () => clearTimeout(calculationTimeout)
	}, [sendValue, sendItem])

	useEffect(() => {
		let calculationTimeout: any

		if(activeCard === CARDS.getCard) {
			if(getValue.length) setIsCalculatingSendValue(true)
			if(getValue.length === 0) {
				setIsCalculatingSendValue(false)
				setSendValue('')
				return
			}

			calculationTimeout = setTimeout(() => {
				const calculatedValue = (Number(getValue) * getItem.price) / sendItem.price

				setSendValue(String(calculatedValue))
				setIsCalculatingSendValue(false)
			}, 2000)
		}

		return () => clearTimeout(calculationTimeout)
	}, [getValue, getItem])

	const handleSwitch = () => {
		setGetItem(sendItem)
		setSendItem(getItem)
		setSendValue(getValue)
		setGetValue(sendValue)
	}


	return (
		<div className={styles.wrapper}>
			<ExchangerCard
				card={CARDS.sendCard}
				item={sendItem}
				setActiveCard={setActiveCard}
				cardTitle='You Send'
				active={activeCard === CARDS.sendCard}
				value={sendValue}
				setInputState={setSendValue}
				isCalculating={isCalculatingSendValue}
			/>
			<button className={styles.switchArrows} onClick={handleSwitch}>
				<Icon type='SWITCH_ARROWS'/>
			</button>
			<ExchangerCard
				card={CARDS.getCard}
				item={getItem}
				setActiveCard={setActiveCard}
				cardTitle='You Get'
				active={activeCard === CARDS.getCard}
				value={getValue}
				setInputState={setGetValue}
				isCalculating={isCalculatingGetValue}
				isTriggerTooltip
			/>
		</div>
	)
}