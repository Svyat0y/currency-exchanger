import {FC, ReactNode, createElement, useRef} from "react"
import {CustomToolTip} from "@/components/tooltip/customTooltip"

type TooltipTriggerProps = {
	children: ReactNode
	tag: string
	tooltipContent: ReactNode
	className: string
	isTooltip: boolean
	handleShowTooltip: () => void
	handleRemoveTooltip: () => void
	backgroundColor: string
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
		backgroundColor,
	}) => {
	const tagRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null)

	const handleHoverToolTip = () => {
		handleShowTooltip()
	}

	const handleRemoveToolTip = () => {
		handleRemoveTooltip()
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
        <CustomToolTip backgroundColor={backgroundColor} isTooltip={isTooltip}>
	        {tooltipContent}
        </CustomToolTip>
			}
		</div>
	)
}