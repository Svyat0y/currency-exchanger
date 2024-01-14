import React, {forwardRef} from "react"
import styles from './checkbox.module.scss'
import classNames from "classnames"
import {Icon} from "@/components/icon"

type CheckboxProps = {
	className?: string
	renderLabel?: JSX.Element | string
	id?: string
	onClick: () => void
	state: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((
	{
		className,
		renderLabel,
		onClick,
		state,
		...props
	},
	ref
) => {
	return (
		<label htmlFor={props.id} className={classNames(styles.wrapper, className)}>
			<input
				id={props.id}
				ref={ref}
				type="checkbox"
				onChange={onClick}
				checked={state}
				{...props}
			/>
			<div className={classNames(styles.box, {[styles.active]: state})}>
				<Icon className={styles.checkedIcon} type='CHECK'/>
			</div>
			<div className={classNames(styles.text, {[styles.active]: state})}>
				{renderLabel}
			</div>
		</label>
	)
})

Checkbox.displayName = "Checkbox"