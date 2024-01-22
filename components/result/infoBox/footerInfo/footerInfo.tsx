import styles from './footerInfo.module.scss'
import {Icon} from "@/components/icon"
import classNames from "classnames"
import {FC} from "react"
import {useMount} from "@/hooks/useMount"

type FooterInfoProps = {
	active: boolean
	handleOpenModal: (state: number) => void
}

const MODALS = {
	transactions: 1,
	logs: 2,
	faqs: 3,
}

const LINKS = [
	{label: 'Transaction Details', icon: 'FILE_EARMARK_MEDICAL', modal: MODALS.transactions},
	{label: 'Exchange Logs', icon: 'CODE_SLASH', modal: MODALS.logs},
	{label: 'FAQs', icon: 'QUESTION_CIRCLE', modal: MODALS.faqs},
]

export const FooterInfo:FC<FooterInfoProps> = ({active, handleOpenModal}) => {
	const {mounted} = useMount(active)

	if(!active && !mounted) return null
	
	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: active
		})}>
			{LINKS.map(item => {
				return (
					<button className={styles.buttonWrapper} key={item.label} onClick={() => handleOpenModal(item.modal)}>
						<span className={styles.groupLeft}>
							<Icon type={item.icon}/>
							{item.label}
						</span>
						<Icon type='ARROW_RIGHT_UP'/>
					</button>
				)
			})}
		</div>
	)
}