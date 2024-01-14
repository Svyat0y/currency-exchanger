"use client"

import styles from './exchanger.module.scss'
import classNames from "classnames"
import {ExchangerCard} from "../exchangerCard"
import {useEffect, useRef, useState} from "react"
import {Icon} from "@/components/icon"

import {formatNumber} from "@/utils/helpers"
import {Wallet} from "@/components/wallet"
import {Terms} from "@/components/exchanger/terms/terms"
import {useExchangeContext} from "@/context/exchangeContext"

export const CARDS = {
	sendCard: 1,
	getCard: 2,
	wallet: 3,
}

export const Exchanger = () => {
	const [activeCard, setActiveCard] = useState(CARDS.sendCard)
	const {getItem, sendItem, sendValue, getValue, setGetValue, setSendValue, setGetItem, setSendItem, wallet, setWallet} = useExchangeContext()
	const [isCalculatingGetValue, setIsCalculatingGetValue] = useState(false)
	const [isCalculatingSendValue, setIsCalculatingSendValue] = useState(false)
	const [isCalculated, setIsCalculated] = useState(false)
	const [isFirstMenuOpen, setIsFirstMenuOpen] = useState(false)
	const [isSecondMenuOpen, setIsSecondMenuOpen] = useState(false)
	const [isSwitching, setIsSwitching] = useState(false)
	const [isTypingCard, setIsTypingCard] = useState(CARDS.sendCard)
	const [isValueError, setIsValueError] = useState(false)
	const prevGetItemRef = useRef(getItem)
	const prevSendItemRef = useRef(sendItem)

	const calculateGetValue = (sendValue: number | null) => {
		if(!sendValue) return
		const calculatedValue = (sendValue * sendItem.price) / getItem.price;
		setGetValue(calculatedValue);
	}

	const calculateSendValue = (getValue: number | null) => {
		if(!getValue) return
		const calculatedValue = (getValue * getItem.price) / sendItem.price;
		setSendValue(calculatedValue);
	}

	useEffect(() => {
		let calculationTimeout: any
		const prevSendItem = prevSendItemRef?.current

		if(!isSwitching) {
			if(sendValue === 0) {
				prevSendItemRef.current = sendItem
				setIsCalculatingGetValue(false)
				setGetValue(null)
				setIsCalculated(false)
				return
			}

			if (prevSendItem !== sendItem) {
				setSendValue(sendItem.min)
				setIsCalculatingGetValue(true)
				calculationTimeout = setTimeout(() => {
					calculateGetValue(sendItem.min)
					setIsCalculatingGetValue(false)
					setIsCalculated(true)
				}, 2000)
			}
		}

		return () => clearTimeout(calculationTimeout)

	}, [sendItem, prevSendItemRef?.current])


	useEffect(() => {
		let calculationTimeout: any
		const prevGetItem = prevGetItemRef?.current

		if(!isSwitching) {
			if(getValue === 0) {
				prevGetItemRef.current = getItem
				setIsCalculatingSendValue(false)
				setSendValue(null)
				setIsCalculated(false)
				return
			}

			if (prevGetItem !== getItem) {
				setIsCalculatingGetValue(true)
				setIsValueError(false)
				calculationTimeout = setTimeout(() => {
					calculateGetValue(getValue)
					setIsCalculatingGetValue(false)
					setIsCalculated(true)
				}, 2000)
			}
		}

		return () => clearTimeout(calculationTimeout)

	}, [getItem, prevGetItemRef?.current])


	useEffect(() => {
		let calculationTimeout: any
		const prevSendItem = prevSendItemRef?.current;

		if(!isSwitching) {
			setIsTypingCard(CARDS.sendCard)
			if(sendValue === 0) {
				setIsValueError(false)
				isTypingCard === CARDS.sendCard && setGetValue(null)
				setIsCalculatingGetValue(false)
				setIsCalculated(false)
				return
			}

			if (isValueError) {
				setActiveCard(CARDS.sendCard)
			}

			if(sendValue && sendValue < sendItem.min) {
				setIsValueError(true)
				setIsCalculatingGetValue(false)
				setIsCalculated(false)
				return
			}

			if(activeCard === CARDS.sendCard && sendValue && (prevSendItem === sendItem)) {
				setIsValueError(false)
				setIsTypingCard(CARDS.sendCard)
				setIsCalculatingGetValue(true)

				calculationTimeout = setTimeout(() => {
					calculateGetValue(sendValue)
					setIsCalculatingGetValue(false)
					setIsCalculated(true)
				}, 2000)
			}
		}

		return () => clearTimeout(calculationTimeout)
	}, [sendValue, isValueError])

	useEffect(() => {
		let calculationTimeout: any
		const prevGetItem = prevGetItemRef?.current;

		if(!isSwitching) {
			setIsTypingCard(CARDS.getCard)
			if(getValue === 0) {
				setIsValueError(false)
				isTypingCard === CARDS.getCard && setSendValue(null)
				setIsCalculatingSendValue(false)
				setIsCalculated(false)
				return
			}

			if(activeCard === CARDS.getCard && getValue && (prevGetItem === getItem)) {
				setIsTypingCard(CARDS.getCard)
				setIsCalculatingSendValue(true)

				calculationTimeout = setTimeout(() => {
					calculateSendValue(getValue)
					setIsCalculatingSendValue(false)
					setIsCalculated(true)
				}, 2000)
			}
		}

		return () => clearTimeout(calculationTimeout)
	}, [getValue])


	useEffect(() => {
		isCalculated && setActiveCard(CARDS.wallet)
	}, [isCalculated])


	const handleSwitch = async () => {
		setIsSwitching(true)
		const switchItems = () => {
			return new Promise<void>(resolve => {
				setGetItem(sendItem)
				setSendItem(getItem)
				setSendValue(getValue)
				setGetValue(sendValue)

				setTimeout(() => resolve(), 0)
			})
		}

		await switchItems()
		setIsSwitching(false)
	}

	useEffect(() => {
		prevGetItemRef.current = getItem
		prevSendItemRef.current = sendItem
	}, [isSwitching])


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

	const formattedSendValue = formatNumber(sendValue, 5)
	const formattedGetValue = formatNumber(getValue, 5)

	const additionalInfoText = `${formattedSendValue} ${sendItem.shortLabel} = ${formattedGetValue} ${getItem.shortLabel}`

	return (
		<div className={classNames(styles.wrapper, {
			[styles.menuIsOpen]: isFirstMenuOpen || isSecondMenuOpen
		})}>
			<div className={styles.content}>
				<div className={styles.cardsWrapper}>
					<ExchangerCard
						isFirstCard
						isTypingCard={isTypingCard === CARDS.sendCard}
						isValueError={isValueError}
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
					<button aria-label='SWITCH_ARROWS' className={classNames(styles.switchArrows, {
						[styles.disabled]: false
					})} onClick={handleSwitch}>
						<Icon type='SWITCH_ARROWS'/>
					</button>
					<ExchangerCard
						isSecondCard
						isTypingCard={isTypingCard === CARDS.getCard}
						isValueError={isValueError}
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
						isCalculatingSendValue={isCalculatingSendValue}
						handleCloseMenu={handleCloseMenu}
						isOpenMenu={isSecondMenuOpen}
						isHided={isFirstMenuOpen}
						isDisabled={isFirstMenuOpen}
						setItem={setGetItem}
					/>
				</div>
				<div className={classNames(styles.exchangeFooter, {
					[styles.isShow]: isCalculated,
					[styles.hided]: isSecondMenuOpen || isFirstMenuOpen,
				})}>
					<Wallet
						active={!isValueError && activeCard === CARDS.wallet}
						setActiveCard={setActiveCard}
						card={CARDS.wallet}
						value={wallet}
						setInputState={setWallet}
						isCalculated={isCalculated}
					/>
					<Terms/>
				</div>
			</div>
		</div>
	)
}