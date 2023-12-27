import {PositionAdjustments, TGetElemPosition, TPositionX, TTriggerPosition} from "./types";

export const POSITIONX = {
	center: 'center',
	left: 'left',
	right: 'right',
}
export const POSITIONY = {
	top: 'top',
	bottom: 'bottom',
}

export const getElemPosition = (elem: any): TGetElemPosition => {
	const accessAttribute = elem?.target ? elem?.target : elem?.current

	const x = accessAttribute?.getBoundingClientRect().left + window.scrollX
	const y = accessAttribute?.getBoundingClientRect().bottom + window.scrollY
	const triggerWidth = accessAttribute?.getBoundingClientRect().width
	const triggerHeight = accessAttribute?.getBoundingClientRect().height

	return {
		"triggerPosition": {
			x: x,
			y: y
		},
		triggerWidth,
		triggerHeight
	}
}

export const getPositionTips = (positionX: TPositionX, triggerPosition: TTriggerPosition, positionAdjustments: PositionAdjustments, indentX: number, toolTipWidth: number, triggerWidth: number) => {

	const canMoveLeft = triggerPosition.x - positionAdjustments['left'] - indentX >= 0;
	const canMoveRight = triggerPosition.x + toolTipWidth + positionAdjustments['right'] - indentX <= window.innerWidth;
	const canMoveCenter = triggerPosition.x - positionAdjustments['center'] - indentX >= 0 && (triggerPosition.x + triggerWidth) + positionAdjustments['center'] + indentX <= window.innerWidth;

	if (positionX === POSITIONX.left && !canMoveLeft) {
		if (canMoveCenter) {
			return 'center'
		} else if (canMoveRight) {
			return 'right'
		} else {
			return 'center'
		}
	} else if (positionX === POSITIONX.right && !canMoveRight) {
		if (canMoveCenter) {
			return 'center'
		} else if (canMoveLeft) {
			return 'left'
		} else {
			return 'center'
		}
	} else if (positionX === POSITIONX.center && canMoveCenter) {
		return 'center'
	} else if (positionX === POSITIONX.center && canMoveLeft) {
		return 'left'
	} else if (positionX === POSITIONX.center && canMoveRight) {
		return 'right'
	} else {
		return positionX
	}
}
