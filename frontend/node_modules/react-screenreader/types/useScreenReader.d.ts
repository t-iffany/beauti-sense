/// <reference types="react" />
declare const useScreenReader: () => {
	a11y: () => JSX.Element | null;
	reader: (
		message: string
	) => {
		onFocus: () => void;
		onBlur: () => void;
	};
	read: (message: string) => void;
};
export default useScreenReader;
