import styles from './interactionBox.module.scss'
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {Dispatch, FC, SetStateAction} from "react"

type InteractionBoxProps = {
	active: boolean
	setIsInteractionWithRightBox: Dispatch<SetStateAction<boolean>>
}

export const InteractionBox: FC<InteractionBoxProps> = (
	{
		active,
		setIsInteractionWithRightBox
	}) => {
	const {mounted} = useMount(active)

	const handleFocus = () => {
		setIsInteractionWithRightBox(true)
	}

	if(!active && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: active && mounted
		})} onClick={handleFocus}>
			game
		</div>
	)
}