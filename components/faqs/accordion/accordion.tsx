import styles from './accordion.module.scss'
import {Icon} from "@/components/icon"
import {useState} from "react"
import {AccContent} from "@/components/faqs/accordion/accContent"
import classNames from "classnames"

const ACCORDIONS = [
	{
		id: 0,
		label: 'What\s the recipient’s address?',
		text: 'First things first. To initiate any activity on the blockchain, you need to set up a crypto wallet. The crypto wallet is an essential part of your crypto activity. It must be a reliable, secure, and convenient solution to send and receive cryptocurrency.'
	},
	{
		id: 1,
		label: 'What\s the recipient’s address?',
		text: 'First things first. To initiate any activity on the blockchain, you need to set up a crypto wallet. The crypto wallet is an essential part of your crypto activity. It must be a reliable, secure, and convenient solution to send and receive cryptocurrency.'
	},
	{
		id: 2,
		label: 'What\s the recipient’s address?',
		text: 'First things first. To initiate any activity on the blockchain, you need to set up a crypto wallet. The crypto wallet is an essential part of your crypto activity. It must be a reliable, secure, and convenient solution to send and receive cryptocurrency.'
	},
	{
		id: 3,
		label: 'What\s the recipient’s address?',
		text: 'First things first. To initiate any activity on the blockchain, you need to set up a crypto wallet. The crypto wallet is an essential part of your crypto activity. It must be a reliable, secure, and convenient solution to send and receive cryptocurrency.'
	},
	{
		id: 4,
		label: 'What\s the recipient’s address?',
		text: 'First things first. To initiate any activity on the blockchain, you need to set up a crypto wallet. The crypto wallet is an essential part of your crypto activity. It must be a reliable, secure, and convenient solution to send and receive cryptocurrency.'
	},
	{
		id: 5,
		label: 'What\s the recipient’s address?',
		text: 'First things first. To initiate any activity on the blockchain, you need to set up a crypto wallet. The crypto wallet is an essential part of your crypto activity. It must be a reliable, secure, and convenient solution to send and receive cryptocurrency.'
	},
]

export const Accordion = () => {
	const [active, setActive] = useState<number[]>([])

	const handleOpenItem = (accId: number) => {
		setActive(prevState => {
			if (prevState.includes(accId)) {
				return prevState.filter(id => id !== accId)
			} else {
				return [...prevState, accId]
			}
		})
	}

	return (
		<div className={styles.wrapper}>
			{ACCORDIONS.map(item => {
				const activeItem = active.includes(item.id)

				return (
					<div key={item.id} className={classNames(styles.item, {[styles.active]: activeItem})}>
						<button className={classNames(styles.accordionTitle, {[styles.active]: activeItem})} onClick={() => handleOpenItem(item.id)}>
							<div className={styles.left}>
								<Icon type='QUESTION_CIRCLE'/>
								<span>{item.label}</span>
							</div>
							<span className={classNames(styles.cross, {
								[styles.active]: activeItem
							})}></span>
						</button>
						<AccContent text={item.text} active={activeItem}/>
					</div>
			)
			})}
		</div>
	)
}