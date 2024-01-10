import styles from './terms.module.scss'
import {Checkbox} from "@/components/checkbox/checkbox"
import {PrimaryButton} from "@/components/buttons/primaryButton"
import {useState} from "react"

export const Terms = () => {
	const [isChecked, setIsChecked] = useState(false)
	const handleState = () => {
		setIsChecked(!isChecked)
	}

	return (
		<div className={styles.wrapper}>
			<Checkbox
				onClick={handleState}
				id='termsCheckbox'
				state={isChecked}
				renderLabel='I agree with Terms of Use, Privacy Policy and AML/KYC'/>
			<PrimaryButton disabled={!isChecked} type='black' text='Exchange'/>
		</div>
	)
}