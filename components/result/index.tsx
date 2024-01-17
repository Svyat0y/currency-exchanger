import styles from './result.module.scss'
import {InfoBox} from "./infoBox/infoBox"
import {InteractionBox} from "./interactioneBox/interactionBox"
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {useContextStatus} from "@/context/statusContext"
export const Result = ({animStart}: {animStart: boolean}) => {
	const {currentStatus, updateState} = useContextStatus()
	const {mounted} = useMount(animStart)

	if(!animStart && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: animStart && mounted,
		})}>
			<InfoBox updateState={updateState} currentStatus={currentStatus}/>
			<InteractionBox currentStatus={currentStatus}/>
		</div>
	)
}