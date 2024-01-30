import {FC, ReactNode, createElement, useRef} from "react"
import {CustomToolTip} from "@/components/tooltip/customTooltip"
import {useNotificationContext} from "@/context/notificationContext"

type TooltipTriggerProps = {
	children: ReactNode
	tag: string
	tooltipContent: ReactNode
	className: string
	isTooltip: boolean
	handleShowTooltip: () => void
	handleRemoveTooltip: () => void
	backgroundColorTooltip: string
}

export const TooltipTrigger: FC<TooltipTriggerProps> = (
	{
		children,
		tag = 'div',
		tooltipContent,
		className,
		isTooltip,
		handleShowTooltip,
		handleRemoveTooltip,
		backgroundColorTooltip,
	}) => {
	const tagRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null)
	const {setIsOverlay} = useNotificationContext()

	const handleHoverToolTip = () => {
		handleShowTooltip()
		setIsOverlay(true)
	}

	const handleRemoveToolTip = () => {
		handleRemoveTooltip()
		setIsOverlay(false)
	}

	const Element = createElement(tag, {
		ref: tagRef,
		className: className,
		onMouseEnter: handleHoverToolTip,
		onMouseLeave: handleRemoveToolTip,
		onTouchEnd: handleHoverToolTip,
	}, children)

	return (
		<div style={{position: "relative"}}>
			{Element}
			{Element &&
        <CustomToolTip backgroundColorTooltip={backgroundColorTooltip} isTooltip={isTooltip}>
					{tooltipContent}
        </CustomToolTip>
			}
		</div>
	)
}