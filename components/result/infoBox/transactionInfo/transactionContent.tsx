import {FC, useEffect} from "react"
import classNames from "classnames"
import styles from "./transactionInfo.module.scss"
import {IconGif} from "@/components/icon/iconGif"
import travelExplore from "./media/travelExplore.gif"
import earthAnim from "./media/earthAnim.gif"
import rocketAnim from "./media/rocketAnim.gif"
import heartAnim from "./media/heartAnim.gif"
import {InfoTitle} from "@/components/result/infoBox/transactionInfo/infoTitle/infoTitle"
import {Truncate} from "@/components/truncate/truncate"
import {Navigation} from "@/components/result/infoBox/transactionInfo/navigation/navigation"
import {TExchangeInfo} from "@/components/result/infoBox/infoBox"
import {GradientText} from "@/components/gradientText/gradientText"
import {DynamicContent} from "@/components/result/infoBox/transactionInfo/contentScreens/dynamicContent"
import {FooterInfo} from "@/components/result/infoBox/footerInfo/footerInfo"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"

type TransactionContentProps = {
	popupIsOpen: boolean
	setPopupIsOpen: (state: boolean) => void
	exchangeInfo?: TExchangeInfo
	walletAddress: string
	isDepositStatus: boolean
	isConfirmationLoading: boolean
	isExchangeStatus: boolean
	isAllSuccess: boolean
	confirmCount: number
	handleOpenModal: (state: number) => void
}

export const TransactionContent: FC<TransactionContentProps> = (
	{
		popupIsOpen,
		exchangeInfo,
		walletAddress,
		setPopupIsOpen,
		isDepositStatus,
		isConfirmationLoading,
		isExchangeStatus,
		isAllSuccess,
		confirmCount,
		handleOpenModal,
	}) => {
	const {updateState} = useContextStatus()

	useEffect(() => {
		if(isAllSuccess) {
			updateState && updateState(WAITING_STATUSES.resetting, STATUS.reset)
		}
	}, [])

	return (
		<div className={classNames(styles.content, {
			[styles.hidden]: popupIsOpen,
			[styles.fullWidth]: isAllSuccess || isConfirmationLoading || isExchangeStatus,
		})}>

			<DynamicContent
				active={isDepositStatus && !isAllSuccess}
				currentScreen={isDepositStatus}
				nextStep={{step: WAITING_STATUSES.confirmations, status: STATUS.loading, delay: 30000}}
			>
				<IconGif gif={travelExplore}/>
				<InfoTitle
					renderText={<>Send <GradientText isUppercase>{exchangeInfo?.sendValue} {exchangeInfo?.sendLabel}</GradientText> to the address below</>}
					subText='Waiting for your deposit...'
				/>
				<Truncate className={styles.walletWrapper} text={walletAddress}/>
				<Navigation walletAddress={walletAddress} setPopupIsOpen={setPopupIsOpen}/>
			</DynamicContent>

			<DynamicContent
				active={isConfirmationLoading && !isAllSuccess}
				currentScreen={isConfirmationLoading}
			>
				<IconGif gif={earthAnim}/>
				<InfoTitle renderText={<>Confirming your deposit</>} subText={<span>Confirmations {confirmCount} / 10</span>}/>
			</DynamicContent>

			<DynamicContent
				active={isExchangeStatus && !isAllSuccess}
				currentScreen={isExchangeStatus}
				nextStep={{step: WAITING_STATUSES.exchange, status: STATUS.success, delay: 22000}}
			>
				<IconGif gif={rocketAnim}/>
				<InfoTitle
					renderText={<>Sending <GradientText isUppercase>{exchangeInfo?.getLabel}</GradientText> to your wallet</>}
					subText='It usually takes 2-5 minutes'
				/>
			</DynamicContent>

			<DynamicContent
				active={isAllSuccess}
				currentScreen={isAllSuccess}
			>
				<IconGif gif={heartAnim}/>
				<InfoTitle
					renderText={<><GradientText>Yey! Exchange is done</GradientText></>}
					subText={`${exchangeInfo?.getValue} ${exchangeInfo?.getLabel} sent to your wallet`}
				/>
				<Truncate withoutTruncate className={styles.successInfo} text='View on the Blockchain'/>
				<FooterInfo active={isAllSuccess} handleOpenModal={handleOpenModal}/>
			</DynamicContent>

		</div>
	)
}