import { MutableRefObject, useEffect } from "react"

export function useOnClickOutside(
	ref: MutableRefObject<any>,
	handler: (event: any) => void,
	secondHandler?: (event: any) => void,
	secondRef?: any,
	timeOutAnimation?: number
) {
	useEffect(
		() => {
			const listener = (event: any) => {
				if (
					!ref.current ||
					ref.current.contains(event.target) ||
					ref.current.closest("#singleToast") && ref.current.closest("#singleToast").contains(event.target) ||
					secondRef?.current?.contains(event.target)
				) {
					return;
				}
				if(timeOutAnimation && secondHandler) {
					secondHandler(false)
					setTimeout(() => {
						handler(event)
					}, timeOutAnimation)
				} else handler(event)
			};

			document.addEventListener("mousedown", listener)
			document.addEventListener("touchstart", listener)
			return () => {
				document.removeEventListener("mousedown", listener)
				document.removeEventListener("touchstart", listener)
			};
		},
		[ref, handler]
	);
}
