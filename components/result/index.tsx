import styles from './result.module.scss'
import {InfoBox} from "./infoBox/infoBox"
import {InteractionBox} from "./interactioneBox/interactionBox"
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"
import {useEffect} from "react"
import {Container} from "@/components/container"

export const Result = ({animStart, setIsShowRightBox, isShowRightBox}: {animStart: boolean, setIsShowRightBox: any, isShowRightBox: boolean}) => {
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

		if (!isShowRightBox || currentStatus === WAITING_STATUSES.deposit) {
			scrollTo(window.top)
		}

	}, [isShowRightBox, currentStatus])


	if(!animStart && !mounted) return null

	return (
		<div id='parentElementId' className={classNames(styles.wrapper, {
			[styles.animStart]: animStart && mounted,
		})}>
			<Container>
				<div className={classNames(styles.boxesWrapper, {
					[styles.isAllSuccess]: isAllSuccess,
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
			</Container>
		</div>
	)
}