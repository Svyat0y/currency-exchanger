import styles from './navigation.module.scss'
import Link from "next/link"
import {FC} from "react"
import classNames from "classnames"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"
import {PrimaryButton} from "@/components/buttons/primaryButton"

type NavigationListProps = {
	isVisible : boolean
}

const NAV_LIST = [
	{id: 0, label: 'Exchange', link: '#'},
	{id: 1, label: 'FAQ', link: '#'},
	{id: 2, label: 'About', link: '#'},
]

export const NavigationList: FC<NavigationListProps> = ({isVisible}) => {
	const {updateState} = useContextStatus()

	return (
		<>
			<ul className={classNames(styles.navListWrapper, {[styles.isVisible]: isVisible})}>
				<>
					{NAV_LIST.map((item) => {
						return (
							<li key={item.id} className={styles.navItem}>
								<Link href={item.link}>{item.label}</Link>
							</li>
						)
					})}
					<div className={styles.testStates} style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}>
						<PrimaryButton type={'gray'} onClick={() => updateState && updateState(WAITING_STATUSES.deposit, STATUS.loading)} text={'deposit'}/>
						<PrimaryButton type={'gray'} onClick={() => updateState && updateState(WAITING_STATUSES.confirmations, STATUS.loading)} text={'confirmations'}/>
						<PrimaryButton type={'gray'} onClick={() => updateState && updateState(WAITING_STATUSES.exchange, STATUS.loading)} text={'exchange'}/>
						<PrimaryButton type={'gray'} onClick={() => updateState && updateState(WAITING_STATUSES.exchange, STATUS.success)} text={'exchange success'}/>
						<PrimaryButton type={'whiteGray'} onClick={() => updateState && updateState(WAITING_STATUSES.resetting, STATUS.reset)} text={'reset all'}/>
					</div>
				</>
			</ul>
		</>
	)
}