import styles from './input.module.scss'
import classNames from "classnames"
import {ChangeEvent, FC, RefObject} from "react"

type InputProps = {
	type?: string
	handleChangeInput: (value: string) => void
	value: number | null
	className?: string
	placeholder?: string
	id: string
	inputRef: RefObject<HTMLInputElement> | null
	onFocus?: () => void
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
				aria-label={id}
				ref={inputRef}
				className={classNames(styles.input, className)}
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