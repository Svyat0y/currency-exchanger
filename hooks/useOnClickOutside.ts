import { MutableRefObject, useEffect } from "react";

export function useOnClickOutside(
	ref: MutableRefObject<any>,
	handler: (event: any) => void,
	secondRef?: MutableRefObject<any>
) {

	useEffect(
		() => {
			if(!ref.current) return
			const listener = (event: any) => {
				if (
					!ref?.current ||
					ref?.current.contains(event.target) ||
					ref?.current.closest("#singleToast") && ref?.current.closest("#singleToast").contains(event?.target) || // for Toast modals
					secondRef?.current?.contains(event.target)
				) {
					return;
				}
				handler(event);
			};

			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return () => {
				document.removeEventListener("mousedown", listener);
				document.removeEventListener("touchstart", listener);
			};
		},
		[ref, handler]
	);
}
