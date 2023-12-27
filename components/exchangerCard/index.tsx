import {FC, useState} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames"
import {CustomButton} from "@/components/buttons/customButton"
import {Input} from "@/components/input"
import {Icon} from "@/components/icon"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {TooltipFee} from "./tooltipFee"
import {Item} from "@/types/types"

type ExchangerCardProps = {
	cardTitle: string
	active: boolean
	isTriggerTooltip?: boolean
	value: string
	setInputState: (value: string) => void
	isCalculating?: boolean
	card: number
	setActiveCard: (card: number) => void
	item: Item
}

export const ExchangerCard: FC<ExchangerCardProps> = (
	{
		active,
		cardTitle,
		isTriggerTooltip,
		value,
		setInputState,
		isCalculating,
		card,
		setActiveCard,
		item,
	}) => {
	const [isLocked, setIsLocked] = useState(false)

	const handleInput = (value: string) => {
		let newText = value.replace(/[^0-9]/g, '')
		setInputState(newText)
	}

	const handleCardClick = () => {
		setActiveCard(card)
	}

	return (
		<div className={styles.wrapper} onClick={handleCardClick}>
			<span className={styles.border}></span>
			<div
				className={classNames(styles.gradientBlock, {
					[styles.active]: active
				})}>
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<span className={styles.titleDesc}>{cardTitle}</span>
					<CustomButton text={item.shortLabel} icon={item.icon}/>
				</div>
				<div className={styles.inputWrapper}>
					{/*<span className={styles.border}></span>*/}
					{isCalculating ? <span className={styles.skeleton}></span> : ''}
					<Input
						id='count'
						value={value}
						handleChangeInput={handleInput}
						placeholder='Enter amount'
						border={false}
					/>
					{isTriggerTooltip &&
            <TooltipTrigger
              className={styles.lockIcon}
              tag='button'
              setIsLocked={setIsLocked}
              isLocked={isLocked}
              tooltipContent={<TooltipFee isLocked={isLocked} isTriggerTooltip={isTriggerTooltip}/>}>
              <Icon type={isLocked ? 'LOCK_GREEN' : 'LOCK_GRAY'}/>
            </TooltipTrigger>
					}
				</div>
			</div>
		</div>
	)
}