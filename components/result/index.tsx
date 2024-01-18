import styles from './result.module.scss'
import {InfoBox} from "./infoBox/infoBox"
import {InteractionBox} from "./interactioneBox/interactionBox"
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"
import {useState} from "react"

export const Result = ({animStart}: {animStart: boolean}) => {
	const [isInteractionWithRightBox, setIsInteractionWithRightBox] = useState(false)
	const {currentStatus} = useContextStatus()
	const isAllSuccess = currentStatus === STATUS.success
	const {mounted} = useMount(animStart)

	if(!animStart && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: animStart && mounted,
		})}>
			<InfoBox
				currentStatus={currentStatus}
				isInteractionWithRightBox={isInteractionWithRightBox}
				isAllSuccess={isAllSuccess}
			/>
			<InteractionBox
				active={currentStatus === WAITING_STATUSES.confirmations || (isInteractionWithRightBox && !isAllSuccess)}
				setIsInteractionWithRightBox={setIsInteractionWithRightBox}
			/>
		</div>
	)
}