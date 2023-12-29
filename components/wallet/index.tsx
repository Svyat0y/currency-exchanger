import styles from './wallet.module.scss'
import {Input} from "@/components/input"
import {FC, useEffect, useRef} from "react"
import classNames from "classnames"
import {GradientBorder} from "@/components/gradientBorder"
import {WalletNavigation} from "@/components/walletNavigation"

type WalletProps = {
	value: string
	setInputState: (value: string) => void
	isCalculated: boolean
	hided: boolean
	active: boolean
	setActiveCard: (card: number) => void
	card: number
}

export const Wallet: FC<WalletProps> = (
	{
		value,
		setInputState,
		active,
		isCalculated,
		hided,
		setActiveCard,
		card
	}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (isCalculated && inputRef?.current) {
				inputRef?.current?.focus()
			}
		}, 500)

		return () => clearTimeout(timeoutId)
	}, [isCalculated])

	return (
		<div className={classNames(styles.walletWrapper, {
			[styles.isShow]: isCalculated,
			[styles.hided]: hided,
		})} onClick={() => setActiveCard(card)}>
			<GradientBorder active={active}/>
			<div className={styles.content}>
				<Input
					id={'wallet'}
					className={styles.walletInput}
					handleChangeInput={setInputState}
					value={value}
					inputRef={inputRef}
					placeholder='Enter Destination Wallet Address'
				/>
				<WalletNavigation setWallet={setInputState}/>
			</div>
		</div>
	)
}