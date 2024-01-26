import styles from './input.module.scss'
import classNames from "classnames"
import {ChangeEvent, FC, RefObject} from "react"

type InputProps = {
	type?: string
	handleChangeInput: (value: string) => void
	value: number | string | null
	className?: string
	placeholder?: string
	id: string
	inputRef: RefObject<HTMLInputElement> | null
	onFocus?: () => void
	isFixedRate?: boolean
	autocomplete?: string
}

export const Input: FC<InputProps> = (
	{
		type = 'text',
		handleChangeInput,
		value,
		className,
		placeholder,
		id,
		onFocus,
		inputRef,
		isFixedRate,
		autocomplete = 'on',
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
				onFocus={onFocus}
				autoComplete={autocomplete}
				aria-label={id}
				ref={inputRef}
				className={classNames(styles.input, className, {[styles.isFixed]: isFixedRate})}
				placeholder={placeholder}
				type={type}
				value={!value ? '' : value}
				id={id}
				onChange={handleChange}
				{...rest}
			/>
		</>
	)
}