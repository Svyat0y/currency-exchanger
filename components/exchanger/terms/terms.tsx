import styles from './terms.module.scss'
import {Checkbox} from "@/components/checkbox/checkbox"
import {PrimaryButton} from "@/components/buttons/primaryButton"
import {useState} from "react"
import {useExchangeContext} from "@/context/exchangeContext"

export const Terms = () => {
	const {setSecondStep} = useExchangeContext()
	const [isChecked, setIsChecked] = useState(false)
	const handleState = () => {
		setIsChecked(!isChecked)
	}

	const handleNextStep = () => {
		setSecondStep(true)
	}

	return (
		<div className={styles.wrapper}>
			<Checkbox
				onClick={handleState}
				id='termsCheckbox'
				state={isChecked}
				renderLabel='I agree with Terms of Use, Privacy Policy and AML/KYC'/>
			<PrimaryButton onClick={handleNextStep} disabled={!isChecked} type='black' text='Exchange'/>
		</div>
	)
}