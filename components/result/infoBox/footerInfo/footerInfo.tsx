import styles from './footerInfo.module.scss'
import {Icon} from "@/components/icon"
import classNames from "classnames"
import {FC, useState} from "react"
import {useMount} from "@/hooks/useMount"
import {Modal} from "@/components/modal"
import {Faqs} from "@/components/faqs"
import {Transactions} from "@/components/transactions/transactions"
import {Logs} from "@/components/logs"

type FooterInfoProps = {
	active: boolean
	confirmCount?: number
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

export const FooterInfo:FC<FooterInfoProps> = ({active, confirmCount}) => {
	const {mounted} = useMount(active)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentModal, setCurrentModal] = useState(MODALS.faqs)

	const handleOpenFaqs = (modal: number) => {
		setCurrentModal(modal)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	if(!active && !mounted) return null
	
	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: active
		})}>
			{LINKS.map(item => {
				return (
					<button className={styles.buttonWrapper} key={item.label} onClick={() => handleOpenFaqs(item.modal)}>
						<span className={styles.groupLeft}>
							<Icon type={item.icon}/>
							{item.label}
						</span>
						<Icon type='ARROW_RIGHT_UP'/>
					</button>
				)
			})}
			<Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
				{currentModal === MODALS.transactions && <Transactions/>}
				{currentModal === MODALS.logs && <Logs confirmCount={confirmCount}/>}
				{currentModal === MODALS.faqs && <Faqs/>}
			</Modal>
		</div>
	)
}