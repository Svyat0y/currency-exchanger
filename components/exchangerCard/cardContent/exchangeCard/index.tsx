import styles from './exhangeCard.module.scss'
import {CustomButton} from "@/components/buttons/customButton"
import {Input} from "@/components/input"
import {FC, useEffect, useRef} from "react"
import {CardContentProps} from "@/components/exchangerCard/cardContent"
import classNames from "classnames"
import {RATES, RateSwitcher} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher"
import {useExchangeContext} from "@/context/exchangeContext"
import {useNotificationContext} from "@/context/notificationContext"
import {DotLoader} from "@/components/loader/dotLoader"

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
		isCalculatingSendValue,
		isTypingCard,
		isValueError,
	}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const {rateState, setRateState} = useExchangeContext()
	const {setIsNotification} = useNotificationContext()
	const isFixedRate = rateState === RATES.fixed

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (active && !isOpenMenu && inputRef?.current) {
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
				{isValueError && !isSecondCard && isTypingCard ?
					<span className={styles.minError}>Min {item.min} {item.shortLabel}</span>
					: <div className={classNames(styles.cardNavWrapper)}>
						{(isCalculatingSendValue && isSecondCard || isCalculating && isSecondCard)
							? <DotLoader className={classNames(styles.loader, styles.cardNavSkeleton)}/>
							: <div className={classNames(styles.navContent, {
								[styles.isVisible]: isCalculated && isSecondCard,
							})}>
								{!isCalculatingSendValue && !isCalculating && !isOpenMenu &&
                  <span className={classNames(styles.additionalInfo, {[styles.isFixed]: isFixedRate})}>{additionalInfo}</span>}
								{isSecondCard && !isOpenMenu &&
                  <RateSwitcher withTooltip rateState={rateState} setRateState={setRateState}
                                setIsNotification={setIsNotification} isOpenMenu={isOpenMenu}/>}
							</div>
						}
					</div>}
			</div>
			<div className={styles.bottom}>
				<span className={styles.titleDesc}>{cardTitle}</span>
				<div className={styles.inputWrapper}>
					{isCalculating
						? <DotLoader className={styles.loader}/>
						: <Input
							inputRef={inputRef}
							id={cardTitle}
							value={value}
							handleChangeInput={handleInput}
							placeholder='Enter amount'
							isFixedRate={isFixedRate && isSecondCard}
						/>
					}
				</div>
			</div>
		</div>
	)
}