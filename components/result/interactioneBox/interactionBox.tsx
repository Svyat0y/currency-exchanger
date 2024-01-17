import styles from './interactionBox.module.scss'
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {FC} from "react";
import {WAITING_STATUSES} from "@/context/statusContext"

type InteractionBoxProps = {
	currentStatus: string
}

export const InteractionBox: FC<InteractionBoxProps> = ({currentStatus}) => {
	const isConfirmationStatus = currentStatus === WAITING_STATUSES.confirmations
	const {mounted} = useMount(isConfirmationStatus)

	if(!isConfirmationStatus && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: isConfirmationStatus && mounted
		})}>game</div>
	)
}