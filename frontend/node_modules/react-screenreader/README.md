[![Build Status](https://travis-ci.org/Kashkovsky/react-screenreader.svg?branch=master)](https://travis-ci.org/Kashkovsky/react-screenreader)
[![Coverage Status](https://coveralls.io/repos/github/Kashkovsky/react-screenreader/badge.svg?branch=master)](https://coveralls.io/github/Kashkovsky/react-screenreader?branch=master)

# Extended screen reader support for React components
**react-screenreader** exposes *useScreenReader* React hook which allows you to easily implement custom dynamic descriptions for screen readers.

## Requirements
**react-screenreader** has no dependencies however it relies on react ^16.8.6 and react-dom ^16.8.6 as peer dependencies.

## Installation
```bash
yarn add react-screenreader
```
## Usage
**useScreenReader** hook returns an object with the following properties:
- **reader** function will return onFocus and onBlur event handlers which allows you to "read" any string when an element is focused. Make sure that target element can accept and properly utilize these props.
- **read** function allows you to "read" strings programmatically.
- **a11y** will render neccessary content for screen reader.

### Basic example:
```jsx
import react, { useCallback } from 'react';
import useScreenReader from 'react-screenreader';

const MyComponent = () => {
	const { reader, read, a11y } = useScreenReader();

	const onButtonClick = useCallback(() => read(`Hello screen reader!`), []);

	return (
		<div>
			{a11y()}
			<button 
				onClick={onButtonClick} 
				{...reader("This sentence will be read on button focus")}
				>
				Click me to hear the voice
			</button>
		</div>
	)
}
```
