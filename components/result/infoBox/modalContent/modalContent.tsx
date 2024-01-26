import {Transactions} from "@/components/transactions/transactions"
import {Logs} from "@/components/logs"
import {Faqs} from "@/components/faqs"
import {Modal} from "@/components/modal"
import {MODALS} from "@/components/result/infoBox/infoBox"
import {FC, useEffect, useState} from "react"
import {useMount} from "@/hooks/useMount"

type ModalContentProps = {
	isModalOpen: boolean
	handleCloseModal: () => void
	currentModal: number
	isAllSuccess: boolean
	confirmCount: number
}

export const ModalContent: FC<ModalContentProps> = ({isModalOpen, handleCloseModal, currentModal, isAllSuccess, confirmCount}) => {
	const LOGS = [
		{id: 0, time: '[12:21:05]', status: 'action', desc: 'CreateOrder 10 USDT to 0.000375 BTC'},
		{id: 1, time: '[12:21:05]', status: 'action', desc: 'LookingForTransaction'},
		{id: 2, time: '[12:21:05]', status: 'success', desc: 'Found 10 USDT, TX:0xba72b008d53d3e65f6641e1d63376be2f9c1ad05'},
		{id: 3, time: '[12:21:05]', status: 'action', desc: `Waiting for confirmations ${confirmCount || '10'}/10...`},
		{id: 4, time: '[12:21:05]', status: 'success', desc: 'AML check passed'},
		{id: 5, time: '[12:21:05]', status: 'action', desc: 'Withdrawing 0.000375 BTC...'},
		{id: 6, time: '[12:21:05]', status: 'success', desc: 'Withdrawal complete. TX:0xba72b008d53d3e65f6641e1d63376be2f9c1ad05'},
		{id: 7, time: '[12:21:05]', status: 'success', desc: 'Exchange completed'},
	]
	const initialLogs = isAllSuccess ? LOGS : LOGS.slice(0, 4);
	const [displayedLogs, setDisplayedLogs] = useState(initialLogs)
	const [logIndex, setLogIndex] = useState(isAllSuccess ? LOGS.length : 4);

	useEffect(() => {
		if (confirmCount && confirmCount >= 10) {
			const intervalId = setInterval(() => {
				if (logIndex < LOGS.length) {
					setDisplayedLogs(currentLogs => [...currentLogs, LOGS[logIndex]])
					setLogIndex(logIndex + 1)
				}
			}, 5000)

			return () => clearInterval(intervalId)
		}
	}, [confirmCount, logIndex])

	useEffect(() => {
		setDisplayedLogs(currentLogs => currentLogs.map(log => {
			if (log.id === 3) {
				return { ...log, desc: `Waiting for confirmations ${confirmCount}/10...` }
			}
			return log
		}))
	}, [confirmCount])
	const {mounted} = useMount(isModalOpen)

	if(!mounted && !isModalOpen) return null

	return (
		<Modal isModalOpen={isModalOpen && mounted} handleCloseModal={handleCloseModal} isNoScroll={currentModal !== MODALS.faqs}>
			{currentModal === MODALS.transactions && <Transactions/>}
			{currentModal === MODALS.logs && <Logs displayedLogs={displayedLogs} isAllSuccess={isAllSuccess} confirmCount={confirmCount}/>}
			{currentModal === MODALS.faqs && <Faqs/>}
		</Modal>
	)
}