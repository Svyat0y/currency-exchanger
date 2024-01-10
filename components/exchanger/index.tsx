"use client"

import styles from './exchanger.module.scss'
import classNames from "classnames"
import {ExchangerCard} from "../exchangerCard"
import {useEffect, useRef, useState} from "react"
import {Icon} from "@/components/icon"
import {currencies} from "@/components/exchanger/data"
import {Item} from "@/types/types"
import {formatNumber} from "@/utils/helpers"
import {Wallet} from "@/components/wallet"
import {Terms} from "@/components/exchanger/terms/terms"

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
	const [isSwitching, setIsSwitching] = useState(false)
	const prevGetItemRef = useRef(getItem)
	const prevSendItemRef = useRef(sendItem)

	const calculateGetValue = () => {
		const calculatedValue = (Number(sendValue) * sendItem.price) / getItem.price;
		setGetValue(String(calculatedValue));
	}

	const calculateSendValue = () => {
		const calculatedValue = (Number(getValue) * getItem.price) / sendItem.price;
		setSendValue(String(calculatedValue));
	}

	useEffect(() => {
		let calculationTimeout: any
		const prevSendItem = prevSendItemRef?.current

		if(!isSwitching) {
			if(sendValue.length === 0) {
				prevSendItemRef.current = sendItem
				setIsCalculatingGetValue(false)
				setGetValue('')
				setIsCalculated(false)
				return
			}

			if (prevSendItem !== sendItem) {
				setIsCalculatingGetValue(true)
				calculationTimeout = setTimeout(() => {
					calculateGetValue()
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
			if(getValue.length === 0) {
				prevGetItemRef.current = getItem
				setIsCalculatingSendValue(false)
				setSendValue('')
				setIsCalculated(false)
				return
			}

			if (prevGetItem !== getItem) {
				setIsCalculatingGetValue(true)
				calculationTimeout = setTimeout(() => {
					calculateGetValue()
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
			if(sendValue.length === 0) {
				setIsCalculatingGetValue(false)
				setGetValue('')
				setIsCalculated(false)
				return
			}

			if(activeCard === CARDS.sendCard && sendValue.length && (prevSendItem === sendItem)) {
				setIsCalculatingGetValue(true)

				calculationTimeout = setTimeout(() => {
					calculateGetValue()
					setIsCalculatingGetValue(false)
					setIsCalculated(true)
				}, 2000)
			}
		}

		return () => clearTimeout(calculationTimeout)
	}, [sendValue])

	useEffect(() => {
		let calculationTimeout: any
		const prevGetItem = prevGetItemRef?.current;

		if(!isSwitching) {
			if(getValue.length === 0) {
				setIsCalculatingSendValue(false)
				setSendValue('')
				setIsCalculated(false)
				return
			}

			if(activeCard === CARDS.getCard && getValue.length && (prevGetItem === getItem)) {
				setIsCalculatingSendValue(true)

				calculationTimeout = setTimeout(() => {
					calculateSendValue()
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

	const formattedSendValue = formatNumber(sendValue, 6)
	const formattedGetValue = formatNumber(getValue, 6)

	const additionalInfoText = `${formattedSendValue} ${sendItem.shortLabel} = ${formattedGetValue} ${getItem.shortLabel}`

	return (
		<div className={classNames(styles.wrapper, {
			[styles.menuIsOpen]: isFirstMenuOpen || isSecondMenuOpen
		})}>
			<div className={styles.content}>
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
					<button aria-label='SWITCH_ARROWS' className={classNames(styles.switchArrows, {
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
				<div className={classNames(styles.exchangeFooter, {
					[styles.isShow]: isCalculated,
					[styles.hided]: isSecondMenuOpen || isFirstMenuOpen,
				})}>
					<Wallet
						active={activeCard === CARDS.wallet}
						setActiveCard={setActiveCard}
						card={CARDS.wallet}
						value={wallet} setInputState={setWallet}
						isCalculated={isCalculated}
					/>
					<Terms/>
				</div>
			</div>
		</div>
	)
}