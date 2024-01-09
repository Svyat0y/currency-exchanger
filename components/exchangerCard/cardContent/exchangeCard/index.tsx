import styles from './exhangeCard.module.scss'
import {CustomButton} from "@/components/buttons/customButton"
import {Input} from "@/components/input"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {TooltipFee} from "./tooltipFee"
import {Icon} from "@/components/icon"
import {FC, useEffect, useRef, useState} from "react"
import {CardContentProps} from "@/components/exchangerCard/cardContent"
import classNames from "classnames"
import {NavigationBox} from "@/components/navigationBox/navigationBox";
import {RateSwitcher} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher";

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
				<CustomButton onClick={handleOpenMenu} text={item?.shortLabel} icon={item?.icon}/>
				{isCalculated && isSecondCard && <div className={styles.cardNav}>
					<span className={styles.additionalInfo}>{additionalInfo}</span>
          <RateSwitcher/>
        </div>}
			</div>
			<div className={styles.bottom}>
				<span className={styles.titleDesc}>{cardTitle}</span>
				<div className={styles.inputWrapper}>
					{isCalculating ? <span className={styles.skeleton}></span> : ''}
					<Input
						inputRef={inputRef}
						id={'Amount'}
						value={value}
						handleChangeInput={handleInput}
						placeholder='Enter amount'
					/>
				</div>
			</div>
		</div>
	)
}