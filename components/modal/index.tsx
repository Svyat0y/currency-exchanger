import styles from './modal.module.scss'
import {FC, ReactNode, useRef} from "react"
import classNames from "classnames"
import {Portal} from "@/components/portal"
import {Overlay} from "@/components/overlay/overlay"
import {GradientBorder} from "@/components/gradientBorder"
import {CloseButton} from "@/components/buttons/closeButton"
import {useOnClickOutside} from "@/hooks/useOnClickOutside"

type ModalProps = {
	children: ReactNode
	isModalOpen: boolean
	handleCloseModal: () => void
}

export const Modal: FC<ModalProps> = ({children, isModalOpen, handleCloseModal}) => {
	const modalRef = useRef<HTMLDivElement | null>(null)
	useOnClickOutside(modalRef, handleCloseModal)

	return (
		<Portal>
			<Overlay active={isModalOpen} zIndex={1000}>
				<div className={classNames(styles.wrapper, {
					[styles.active]: isModalOpen
				})} ref={modalRef}>
						<CloseButton className={styles.modalClose} onClick={handleCloseModal}/>
						<GradientBorder withoutAnim active={true}/>
					<div className={classNames(styles.contentWrapper)}>
						<div className={styles.content}>
							{children}
						</div>
					</div>
				</div>
			</Overlay>
		</Portal>
	)
}