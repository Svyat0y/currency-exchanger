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
	getCard: 2,
	wallet: 3,
}

export const Exchanger = () => {
	const [activeCard, setActiveCard] = useState(CARDS.sendCard)
	const [sendItem, setSendItem] = useState<Item>(currencies[0])
	const [getItem, setGetItem] = useState<Item>(currencies[4])
	const [sendValue, setSendValue] = useState('')
	const [getValue, setGetValue] = useState('')
	const [isCalculatingGetValue, setIsCalculatingGetValue] = useState(false)
	const [isCalculatingSendValue, setIsCalculatingSendValue] = useState(false)
	const [isCalculated, setIsCalculated] = useState(false)
	const [wallet, setWallet] = useState('')
	const [isFirstMenuOpen, setIsFirstMenuOpen] = useState(false)
	const [isSecondMenuOpen, setIsSecondMenuOpen] = useState(false)

	useEffect(() => {
		isCalculated && setActiveCard(CARDS.wallet)
	}, [isCalculated])

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
				setIsCalculated(true)
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
				setIsCalculated(true)
			}, 2000)
		}

		return () => clearTimeout(calculationTimeout)
	}, [getValue, getItem])

	const handleSwitch = () => {
		setGetItem(sendItem)
		setSendItem(getItem)
	}

	const handleFirsCardMenu = () => {
		setIsFirstMenuOpen(true)
	}

	const handleSecondCardMenu = () => {
		setIsSecondMenuOpen(true)
	}

	const handleCloseMenu = () => {
		setIsFirstMenuOpen(false)
		setIsSecondMenuOpen(false)
	}

	const formattedSendValue = formatNumber(sendValue, 6)
	const formattedGetValue = formatNumber(getValue, 6)

	const additionalInfoText = `${formattedSendValue} ${sendItem.shortLabel} = ${formattedGetValue} ${getItem.shortLabel}`

	return (
		<div className={classNames(styles.wrapper, {
			[styles.menuIsOpen]: isFirstMenuOpen || isSecondMenuOpen
		})}>
			<div className={styles.cardsWrapper}>
				<ExchangerCard
					isFirstCard
					card={CARDS.sendCard}
					cardName='sendCard'
					isCalculated={isCalculated}
					setIsCardMenu={handleFirsCardMenu}
					item={sendItem}
					setActiveCard={setActiveCard}
					cardTitle='You Send'
					active={activeCard === CARDS.sendCard}
					value={sendValue}
					setInputState={setSendValue}
					isCalculating={isCalculatingSendValue}
					handleCloseMenu={handleCloseMenu}
					isOpenMenu={isFirstMenuOpen}
					isHided={(isSecondMenuOpen)}
					isDisabled={isSecondMenuOpen}
					setItem={setSendItem}
				/>
				<button className={classNames(styles.switchArrows, {
					[styles.disabled]: false
				})} onClick={handleSwitch}>
					<Icon type='SWITCH_ARROWS'/>
				</button>
				<ExchangerCard
					isSecondCard
					card={CARDS.getCard}
					cardName='getCard'
					setIsCardMenu={handleSecondCardMenu}
					isCalculated={isCalculated}
					additionalInfo={additionalInfoText}
					item={getItem}
					setActiveCard={setActiveCard}
					cardTitle='You Get'
					active={activeCard === CARDS.getCard}
					value={getValue}
					setInputState={setGetValue}
					isCalculating={isCalculatingGetValue}
					handleCloseMenu={handleCloseMenu}
					isOpenMenu={isSecondMenuOpen}
					isHided={isFirstMenuOpen}
					isDisabled={isFirstMenuOpen}
					setItem={setGetItem}
				/>
			</div>
			<Wallet
				hided={isSecondMenuOpen || isFirstMenuOpen}
				active={activeCard === CARDS.wallet}
				setActiveCard={setActiveCard}
				card={CARDS.wallet}
				value={wallet} setInputState={setWallet}
				isCalculated={isCalculated}
			/>
		</div>
	)
}