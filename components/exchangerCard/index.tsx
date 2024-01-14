import {FC, useState} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames"
import {Item} from "@/types/types"
import {GradientBorder} from "@/components/gradientBorder"
import {CardContent} from "./cardContent"

type ExchangerCardProps = {
	cardTitle: string
	active: boolean
	value: number | null
	setInputState: (value: number | null) => void
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
	isHided: boolean
	isDisabled: boolean
	cardName: string
	setItem: (item: Item) => void
	isCalculatingSendValue?: boolean
	isTypingCard: boolean
	isValueError: boolean
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
		isHided,
		isDisabled,
		cardName,
		setItem,
		isCalculatingSendValue,
		isTypingCard,
		isValueError,
	}) => {
	const [popupIsOpen, setPopupIsOpen] = useState(false)

	const handleInput = (value: string) => {
		let newText = value.replace(/[^0-9.]/g, '')
		setInputState(Number(newText))
	}

	const handleCardClick = () => {
		setActiveCard(card)
	}

	const handleOpenMenu = () => {
		setIsCardMenu()
	}

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
		<div className={classNames(styles.wrapper, styles[cardName], {
			[styles.hided]: isHided,
			[styles.disabled]: isDisabled,
			[styles.unActive]: isCalculating,
			[styles.isMenuFirst]: isOpenMenu && isFirstCard,
			[styles.isMenuSecond]: isOpenMenu && isSecondCard
		})} onClick={handleCardClick}>
			<GradientBorder active={active && !popupIsOpen && (!isCalculated || isOpenMenu)} withoutAnim={isOpenMenu}/>
			<CardContent {...cardProps}/>
		</div>
	)
}