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
	active: boolean
	setActiveCard: (card: number) => void
	card: number
	walletError: string
	setWalletError: (state: string) => void
}

export const Wallet: FC<WalletProps> = (
	{
		value,
		setInputState,
		active,
		isCalculated,
		setActiveCard,
		card,
		walletError,
		setWalletError,
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

	const handleWallet = (wallet: string) => {
		setWalletError('')
		setInputState(wallet)
	}

	return (
		<div className={classNames(styles.walletWrapper)} onClick={() => setActiveCard(card)}>
			<GradientBorder active={active}/>
			<div className={styles.content}>
				<span className={classNames(styles.walletError, {[styles.active]: !!walletError})}>
					{walletError}
				</span>
				<Input
					onFocus={() => setActiveCard(card)}
					id={'wallet'}
					className={styles.walletInput}
					handleChangeInput={handleWallet}
					value={value}
					inputRef={inputRef}
					placeholder='Enter Destination Wallet Address'
				/>
				<WalletNavigation setWallet={setInputState}/>
			</div>
		</div>
	)
}