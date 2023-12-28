"use client"

import styles from './exchanger.module.scss'
import classNames from "classnames"
import {ExchangerCard} from "../exchangerCard"
import {useEffect, useState} from "react"
import {Icon} from "@/components/icon"
import {currencies} from "@/components/exchanger/data"
import {Item} from "@/types/types"
import {formatNumber} from "@/utils/helpers"
import {Wallet} from "@/components/wallet"

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
	const [isCalculatingGetValue, setIsCalculatingGetValue] = useState(false)
	const [isCalculatingSendValue, setIsCalculatingSendValue] = useState(false)
	const [isCalculated, setIsCalculated] = useState(false)
	const [disableCard, setDisableCard] = useState(false)
	const [wallet, setWallet] = useState('')

	useEffect(() => {
		if((sendValue.length && getValue.length) && (!isCalculatingGetValue && !isCalculatingSendValue)) {
			setIsCalculated(true)
		}
	}, [isCalculatingGetValue, isCalculatingSendValue, sendValue, getValue])

	useEffect(() => {
		let calculationTimeout: any

		if(sendValue.length === 0) {
			setIsCalculatingGetValue(false)
			setGetValue('')
			setIsCalculated(false)
			return
		}

		if(activeCard === CARDS.sendCard && sendValue.length) {
			setIsCalculatingGetValue(true)

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

		if(getValue.length === 0) {
			setIsCalculatingSendValue(false)
			setSendValue('')
			setIsCalculated(false)
			return
		}

		if(activeCard === CARDS.getCard && getValue.length) {
			setIsCalculatingSendValue(true)

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
	}

	const formattedSendValue = formatNumber(sendValue, 6)
	const formattedGetValue = formatNumber(getValue, 6)

	const additionalInfoText = `${formattedSendValue} ${sendItem.shortLabel} = ${formattedGetValue} ${getItem.shortLabel}`

	return (
		<div className={styles.wrapper}>
			<div className={styles.cardsWrapper}>
				<ExchangerCard
					isFirstCard
					isCalculated={isCalculated}
					card={CARDS.sendCard}
					item={sendItem}
					setActiveCard={setActiveCard}
					cardTitle='You Send'
					active={activeCard === CARDS.sendCard}
					value={sendValue}
					setInputState={setSendValue}
					isCalculating={isCalculatingSendValue}
					disableCard={disableCard}
				/>
				<button className={classNames(styles.switchArrows, {
					[styles.disabled]: disableCard
				})} onClick={handleSwitch}>
					<Icon type='SWITCH_ARROWS'/>
				</button>
				<ExchangerCard
					isSecondCard
					isCalculated={isCalculated}
					additionalInfo={additionalInfoText}
					card={CARDS.getCard}
					item={getItem}
					setActiveCard={setActiveCard}
					cardTitle='You Get'
					active={activeCard === CARDS.getCard}
					value={getValue}
					setInputState={setGetValue}
					isCalculating={isCalculatingGetValue}
					disableCard={disableCard}
				/>
			</div>

			<Wallet value={wallet} setInputState={setWallet} isCalculated={isCalculated}/>
		</div>
	)
}