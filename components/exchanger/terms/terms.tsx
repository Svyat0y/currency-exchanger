import styles from './terms.module.scss'
import {Checkbox} from "@/components/checkbox/checkbox"
import {PrimaryButton} from "@/components/buttons/primaryButton"
import {FC, useState} from "react"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"

type TermsProps = {
	wallet: string
	setWalletError: (state: string) => void
	walletError: string
}

export const Terms: FC<TermsProps> = ({wallet, setWalletError, walletError}) => {
	const {updateState} = useContextStatus()
	const [isChecked, setIsChecked] = useState(false)

	const handleState = () => {
		setIsChecked(!isChecked)
	}

	const handleNextStep = () => {
		const MIN_WALLET_LENGTH = 26

		if (wallet.length < MIN_WALLET_LENGTH) {
			setWalletError('Incorrect wallet')
			return
		}
		else setTimeout(() => {
			updateState && updateState(WAITING_STATUSES.deposit, STATUS.loading)
		}, 100)
	}

	return (
		<div className={styles.wrapper}>
			<Checkbox
				onClick={handleState}
				id='termsCheckbox'
				state={isChecked}
				renderLabel='I agree with Terms of Use, Privacy Policy and AML/KYC'/>
			<PrimaryButton onClick={handleNextStep} disabled={!isChecked || !wallet || !!walletError} type='black' text='Exchange'/>
		</div>
	)
}