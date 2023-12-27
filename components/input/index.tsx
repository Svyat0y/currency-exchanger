import styles from './input.module.scss'
import classNames from "classnames"
import {ChangeEvent, FC} from "react"

type InputProps = {
	type?: string
	handleChangeInput: (value: string) => void
	value: string
	className?: string
	placeholder?: string
	border: boolean
	id: string
}

export const Input: FC<InputProps> = (
	{
		type = 'text',
		handleChangeInput,
		value,
		className,
		placeholder,
		border = true,
		id,
		...rest
	}) => {

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		handleChangeInput(value)
	}

	return (
		<>
			<label className={styles.inputLabel} htmlFor={id}></label>
			<input
				className={classNames(styles.input, className, {
					[styles.withBorder]: border
				})}
				placeholder={placeholder}
				type={type}
				value={value}
				id={id}
				onChange={handleChange}
				{...rest}
			/>
		</>
	)
}