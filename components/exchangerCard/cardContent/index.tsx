import styles from './cardContent.module.scss'
import {FC} from "react"
import {Item} from "@/types/types"
import {ExchangeCard} from "@/components/exchangerCard/cardContent/exchangeCard"
import {MenuCard} from "@/components/exchangerCard/cardContent/menuCard"

export type CardContentProps = {
	cardTitle: string
	active: boolean
	value: number | string | null
	handleOpenMenu: () => void
	handleInput: (value: number | string | null) => void
	isCalculating?: boolean
	item: Item
	isSecondCard?: boolean
	additionalInfo?: string
	isCalculated?: boolean
	isOpenMenu?: boolean
	handleCloseMenu: () => void
	setItem: (item: Item) => void
	setPopupIsOpen: (state: boolean) => void
	popupIsOpen: boolean
	isCalculatingSendValue?: boolean
	isTypingCard: boolean
	isValueError: boolean
}

export const CardContent: FC<CardContentProps> = (
	{
		...props
	}) => {
	const {isOpenMenu, handleCloseMenu, setItem, setPopupIsOpen, popupIsOpen} = props

	return (
		<div className={styles.wrapper}>
			<ExchangeCard isOpenMenu={isOpenMenu} {...props}/>
			<MenuCard
				setItem={setItem}
				handleCloseMenu={handleCloseMenu}
				isOpenMenu={isOpenMenu}
				setPopupIsOpen={setPopupIsOpen}
				popupIsOpen={popupIsOpen}
			/>
		</div>
	)
}