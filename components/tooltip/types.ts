import React, {ReactNode, RefObject} from "react";

export type TToolTipPosition = {
	x: number | undefined | 0,
	y: number | undefined | 0
}

export type TPositionX = 'center' | 'left' | 'right'

export type TTriggerPosition = {
	x: number,
	y: number
}

export type TCustomToolTipProps = {
	triggerElement: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement> | React.Ref<HTMLElement> | undefined
	triggerRef?: RefObject<any>;
	toolTipRef?: RefObject<any>;
	isToolTip: boolean
	handleRemoveToolTip?: (e?: React.ChangeEvent<HTMLInputElement>) => void
	className?: string
	indentY?: number
	indentX?: number
	positionX?: TPositionX
	positionY?: 'top' | 'bottom'
	width?: number
	children: ReactNode
}

export type TGetElemPosition = {
	triggerPosition: TTriggerPosition
	triggerWidth: number;
	triggerHeight: number;
}

export type PositionAdjustments = {
	[key: string]: number;
}