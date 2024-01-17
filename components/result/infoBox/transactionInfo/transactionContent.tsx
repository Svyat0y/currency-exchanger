import {FC} from "react"
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

type TransactionContentProps = {
	popupIsOpen: boolean
	setPopupIsOpen: (state: boolean) => void
	exchangeInfo?: TExchangeInfo
	walletAddress: string
	isDepositStatus: boolean
	isConfirmationLoading: boolean
	isExchangeStatus: boolean
	isAllSuccess: boolean
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
	}) => {

	return (
		<div className={classNames(styles.content, {
			[styles.hidden]: popupIsOpen,
			[styles.fullWidth]: isAllSuccess || isConfirmationLoading || isExchangeStatus,
		})}>

			<DynamicContent active={isDepositStatus && !isAllSuccess}>
				<IconGif gif={travelExplore}/>
				<InfoTitle
					renderText={<>Send <GradientText isUppercase>{exchangeInfo?.sendValue} {exchangeInfo?.sendLabel}</GradientText> to the address below</>}
					subText='Waiting for your deposit...'
				/>
				<Truncate className={styles.walletWrapper} text={walletAddress}/>
				<Navigation walletAddress={walletAddress} setPopupIsOpen={setPopupIsOpen}/>
			</DynamicContent>

			<DynamicContent active={isConfirmationLoading && !isAllSuccess}>
				<IconGif gif={earthAnim}/>
				<InfoTitle renderText={<>Confirming your deposit</>} subText='Confirmations 1 / 10 ...'/>
			</DynamicContent>

			<DynamicContent active={isExchangeStatus && !isAllSuccess}>
				<IconGif gif={rocketAnim}/>
				<InfoTitle
					renderText={<>Sending <GradientText isUppercase>{exchangeInfo?.getLabel}</GradientText> to your wallet</>}
					subText='It usually takes 2-5 minutes'
				/>
			</DynamicContent>

			<DynamicContent active={isAllSuccess}>
				<IconGif gif={heartAnim}/>
				<InfoTitle
					renderText={<><GradientText>Yey! Exchange is done</GradientText></>}
					subText={`${exchangeInfo?.getValue} ${exchangeInfo?.getLabel} sent to your wallet`}
				/>
				<Truncate withoutTruncate className={styles.successInfo} text='View on the Blockchain'/>
				<FooterInfo active={isAllSuccess}/>
			</DynamicContent>

		</div>
	)
}