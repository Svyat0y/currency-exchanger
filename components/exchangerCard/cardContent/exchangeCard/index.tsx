import styles from './exhangeCard.module.scss'
import {CustomButton} from "@/components/buttons/customButton"
import {Input} from "@/components/input"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {TooltipFee} from "./tooltipFee"
import {Icon} from "@/components/icon"
import {FC, useEffect, useRef, useState} from "react"
import {CardContentProps} from "@/components/exchangerCard/cardContent"
import classNames from "classnames"

type ExchangeCardProps = CardContentProps

export const ExchangeCard: FC<ExchangeCardProps> = (
	{
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
	}) => {
	const [isLocked, setIsLocked] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)

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
			[styles.isOpenMenu]: isOpenMenu
		})}>
			<div className={styles.header}>
				<span className={styles.titleDesc}>{cardTitle}</span>
				<CustomButton onClick={handleOpenMenu} text={item?.shortLabel} icon={item?.icon}/>
			</div>
			<div className={styles.inputWrapper}>
				{isCalculating ? <span className={styles.skeleton}></span> : ''}
				<Input
					inputRef={inputRef}
					id={'Amount'}
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
            <Icon type={isLocked ? 'LOCK' : 'LOCK'}/>
          </TooltipTrigger>
				}
			</div>
		</div>
	)
}