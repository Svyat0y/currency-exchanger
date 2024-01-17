import styles from './interactionBox.module.scss'
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {FC} from "react";

type InteractionBoxProps = {
	isConfirmationLoading: boolean
}

export const InteractionBox: FC<InteractionBoxProps> = ({isConfirmationLoading}) => {
	const {mounted} = useMount(isConfirmationLoading)

	if(!isConfirmationLoading && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: isConfirmationLoading && mounted
		})}>game</div>
	)
}