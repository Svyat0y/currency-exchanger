import styles from './modal.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import {FC, ReactNode} from "react"

type ModalProps = {
	children: ReactNode
}

export const Modal: FC<ModalProps> = ({children}) => {



	return (
		<div className={styles.wrapper}>
			<GradientBorder withoutAnim active={true}/>
			<div className={styles.modalContent}>
				{children}
			</div>
		</div>
	)
}