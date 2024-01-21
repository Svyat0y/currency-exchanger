import styles from './faqs.module.scss'
import {Accordion} from "@/components/faqs/accordion/accordion"

export const Faqs = () => {
	return (
		<div className={styles.wrapper}>
			<h5 className={styles.title}>FAQs</h5>
			<div className={styles.content}>
				<Accordion/>
			</div>
		</div>
	)
}