import {FC, useEffect, useState} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames"
import {Item} from "@/types/types"
import {GradientBorder} from "@/components/gradientBorder"
import {CardContent} from "./cardContent"

type ExchangerCardProps = {
	cardTitle: string
	active: boolean
	value: number | string | null
	setInputState: (value: number | string | null) => void
	isCalculating?: boolean
	card: number
	setActiveCard: (card: number) => void
	item: Item
	isFirstCard?: boolean
	isSecondCard?: boolean
	additionalInfo?: string
	isCalculated?: boolean
	setIsCardMenu: () => void
	handleCloseMenu: () => void
	isOpenMenu: boolean
	cardName: string
	setItem: (item: Item) => void
	isCalculatingSendValue?: boolean
	isTypingCard: boolean
	isValueError: boolean
	isOppositeMenuOpen: boolean
}

export const ExchangerCard: FC<ExchangerCardProps> = (
	{
		active,
		cardTitle,
		value,
		setInputState,
		isCalculating,
		card,
		setActiveCard,
		item,
		isSecondCard,
		additionalInfo,
		isCalculated,
		isFirstCard,
		setIsCardMenu,
		handleCloseMenu,
		isOpenMenu,
		cardName,
		setItem,
		isCalculatingSendValue,
		isTypingCard,
		isValueError,
		isOppositeMenuOpen,
	}) => {
	const [popupIsOpen, setPopupIsOpen] = useState(false)
	// const [isAbsolute, setIsAbsolute] = useState(false);


	const handleInput = (value: number | string | null) => {
		let newText = String(value).replace(/[^0-9.]/g, '')
		setInputState(Number(newText))
	}

	const handleCardClick = () => {
		setActiveCard(card)
	}

	const handleOpenMenu = () => {
		setIsCardMenu()
	}

	// useEffect(() => {
	// 	if (isOpenMenu && (isFirstCard || isSecondCard)) {
	// 		setIsAbsolute(true);
	// 	} else if (!isOpenMenu) {
	// 		setTimeout(() => {
	// 			setIsAbsolute(false);
	// 		}, 600); // Задержка в 600 мс
	// 	}
	// }, [isOpenMenu, isFirstCard, isSecondCard]);


	const cardProps = {
		cardTitle,
		handleOpenMenu,
		item,
		isCalculating,
		value,
		handleInput,
		isCalculated,
		isSecondCard,
		isFirstCard,
		additionalInfo,
		active,
		isOpenMenu,
		handleCloseMenu,
		setItem,
		setPopupIsOpen,
		popupIsOpen,
		isCalculatingSendValue,
		isTypingCard,
		isValueError,
	}

	return (
		<div id={'animCard'} className={classNames(styles.wrapper, styles[cardName], {
			[styles.disabled]: isOppositeMenuOpen,
			[styles.unActive]: isCalculating,
			[styles.isMenuFirst]: isOpenMenu && isFirstCard,
			[styles.isMenuSecond]: isOpenMenu && isSecondCard
		})} onClick={handleCardClick}>
			<GradientBorder active={active && !popupIsOpen && (!isCalculated || isOpenMenu)} withoutAnim={isOpenMenu}/>
			<CardContent {...cardProps}/>
		</div>
	)
}