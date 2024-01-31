import classNames from "classnames";
import styles from "@/components/exchanger/exchanger.module.scss"
import {Wallet} from "@/components/wallet"
import {Terms} from "@/components/exchanger/terms/terms"
import {FC} from "react"

type ExchangeFooterProps = {
	active: boolean
	wallet: string
	setActiveCard: (card: number) => void
	card: number
	walletError: string
	setInputState: (state: string) => void
	setWalletError: (state: string) => void
	isCalculated: boolean
}
export const ExchangeFooter: FC<ExchangeFooterProps> = (
	{
		active,
		wallet,
		setInputState,
		setActiveCard,
		isCalculated,
		walletError,
		setWalletError,
		card,
	}) => {

	return (
		<div className={classNames(styles.exchangeFooter, {
			[styles.isShow]: active && isCalculated,
		})}>
			<Wallet
				active={active}
				setActiveCard={setActiveCard}
				card={card}
				value={wallet}
				setInputState={setInputState}
				isCalculated={isCalculated}
				walletError={walletError}
				setWalletError={setWalletError}
			/>
			<Terms wallet={wallet} setWalletError={setWalletError} walletError={walletError}/>
		</div>
	)
}