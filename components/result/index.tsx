import styles from './result.module.scss'
import {InfoBox} from "./infoBox/infoBox"
import {InteractionBox} from "./interactioneBox/interactionBox"
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {STATUS, useContextStatus} from "@/context/statusContext"
import {useEffect, useState} from "react"

export const Result = ({animStart}: {animStart: boolean}) => {
	const [isShowRightBox, setIsShowRightBox] = useState(false)
	const {currentStatus, updateState} = useContextStatus()
	const isAllSuccess = currentStatus === STATUS.success
	const {mounted} = useMount(animStart)

	useEffect(() => {

		const scrollTo = (element: any) => {
			element.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		}

		if (!isShowRightBox) {
			scrollTo(document.body)
		}

	}, [isShowRightBox])


	if(!animStart && !mounted) return null

	return (
		<div id='parentElementId' className={classNames(styles.wrapper, {
			[styles.animStart]: animStart && mounted,
		})}>
			<InfoBox
				currentStatus={currentStatus}
				isAllSuccess={isAllSuccess}
				updateState={updateState}
				isShowRightBox={isShowRightBox}
				setIsShowRightBox={setIsShowRightBox}
			/>
			<InteractionBox
				setIsShowRightBox={setIsShowRightBox}
				active={isShowRightBox}
			/>
		</div>
	)
}