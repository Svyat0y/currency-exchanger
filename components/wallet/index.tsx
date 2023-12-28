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
}

export const Wallet: FC<WalletProps> = ({value, setInputState, isCalculated}) => {
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
			[styles.isShow]: isCalculated
		})}>
			<GradientBorder active={isCalculated}/>
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