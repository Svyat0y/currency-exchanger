import {FC, useEffect, useRef, useState} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames"
import {CustomButton} from "@/components/buttons/customButton"
import {Input} from "@/components/input"
import {Icon} from "@/components/icon"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {TooltipFee} from "./tooltipFee"
import {Item} from "@/types/types"
import {GradientBorder} from "@/components/gradientBorder"

type ExchangerCardProps = {
	cardTitle: string
	active: boolean
	value: string
	setInputState: (value: string) => void
	isCalculating?: boolean
	card: number
	setActiveCard: (card: number) => void
	item: Item
	disableCard: boolean
	isFirstCard?: boolean
	isSecondCard?: boolean
	additionalInfo?: string
	isCalculated?: boolean
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
		disableCard,
		isSecondCard,
		additionalInfo,
		isCalculated,
	}) => {
	const [isLocked, setIsLocked] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleInput = (value: string) => {
		let newText = value.replace(/[^0-9.]/g, '')
		setInputState(newText)
	}

	const handleCardClick = () => {
		setActiveCard(card)
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (active && inputRef?.current) {
				inputRef?.current?.focus()
			}
		}, 0)

		return () => clearTimeout(timeoutId)
	}, [active])

	return (
		<div className={classNames(styles.wrapper, {
			[styles.disabled]: isCalculating || disableCard,
		})} onClick={handleCardClick}>
			<GradientBorder active={active} isCalculated={isCalculated} disabled={disableCard}/>
			<div className={styles.content}>
				<div className={styles.header}>
					<span className={styles.titleDesc}>{cardTitle}</span>
					<CustomButton text={item.shortLabel} icon={item.icon}/>
				</div>
				<div className={styles.inputWrapper}>
					{isCalculating ? <span className={styles.skeleton}></span> : ''}
					<Input
						inputRef={inputRef}
						id='count'
						value={value}
						handleChangeInput={handleInput}
						placeholder='Enter amount'
					/>
					{isCalculated && isSecondCard && <span className={styles.additionalInfo}>
						{additionalInfo}
					</span>}
					{isCalculated && isSecondCard &&
            <TooltipTrigger
              className={styles.lockIcon}
              tag='button'
              setIsLocked={setIsLocked}
              isLocked={isLocked}
              tooltipContent={<TooltipFee isLocked={isLocked}/>}>
              <Icon type={isLocked ? 'LOCK_GREEN' : 'LOCK_GRAY'}/>
            </TooltipTrigger>
					}
				</div>
			</div>
		</div>
	)
}