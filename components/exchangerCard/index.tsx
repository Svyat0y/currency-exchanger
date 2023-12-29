import {FC} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames"
import {Item} from "@/types/types"
import {GradientBorder} from "@/components/gradientBorder"
import {CardContent} from "./cardContent"

type ExchangerCardProps = {
	cardTitle: string
	active: boolean
	value: string
	setInputState: (value: string) => void
	isCalculating?: boolean
	card: number
	setActiveCard: (card: number) => void
	item: Item
	isFirstCard?: boolean
	isSecondCard?: boolean
	additionalInfo?: string
	isCalculated?: boolean
	setIsCardMenu: () => void
	isOpenFirstCardMenu: boolean
	isOpenSecondCardMenu: boolean
	handleCloseMenu: () => void
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
		isOpenFirstCardMenu,
		isOpenSecondCardMenu,
		handleCloseMenu,
	}) => {

	const handleInput = (value: string) => {
		let newText = value.replace(/[^0-9.]/g, '')
		setInputState(newText)
	}

	const handleCardClick = () => {
		setActiveCard(card)
	}

	const handleOpenMenu = () => {
		setIsCardMenu()
	}

	const isOpenMenu = isOpenSecondCardMenu || isOpenFirstCardMenu
	const cardProps = {
		cardTitle,
		handleOpenMenu,
		item,
		isCalculating,
		value,
		handleInput,
		isCalculated,
		isSecondCard,
		additionalInfo,
		active,
		isOpenMenu,
		handleCloseMenu,
	}

	return (
		<div className={classNames(styles.wrapper, {
			[styles.firstCard]: isFirstCard,
			[styles.secondCard]: isSecondCard,
			[styles.hided]: ((isFirstCard && (isOpenSecondCardMenu) || (isSecondCard && (isOpenFirstCardMenu))) && !isCalculating) || (isSecondCard && isOpenFirstCardMenu && !isCalculating),
			[styles.disabled]: (isCalculating) || (isFirstCard && isOpenSecondCardMenu) || (isSecondCard && isOpenFirstCardMenu),
			[styles.isMenuFirst]: isOpenFirstCardMenu && isFirstCard,
			[styles.isMenuSecond]: isOpenSecondCardMenu && isSecondCard
		})} onClick={handleCardClick}>
			<GradientBorder active={active}/>
			<CardContent {...cardProps}/>
		</div>
	)
}