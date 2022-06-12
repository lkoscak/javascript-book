import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useEffect, useState } from "react";
import "./resizable.css";

interface IResizableProps {
	direction: "horizontal" | "vertical";
}

const Resizable: React.FC<IResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;
	const [windowDimensions, setWindowDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [width, setWidth] = useState(window.innerWidth * 0.75);

	useEffect(() => {
		let timer: any;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(() => {
				setWindowDimensions({
					width: window.innerWidth,
					height: window.innerHeight,
				});
				if (window.innerWidth * 0.75 < width)
					setWidth(window.innerWidth * 0.75);
			}, 100);
		};
		window.addEventListener("resize", listener);
		return () => {
			window.removeEventListener("resize", listener);
		};
	}, [width]);

	if (direction === "horizontal") {
		resizableProps = {
			className: "resize-horizontal",
			height: Infinity,
			width,
			resizeHandles: ["e"],
			maxConstraints: [windowDimensions.width * 0.75, Infinity],
			minConstraints: [windowDimensions.width * 0.2, Infinity],
			onResizeStop: (_event, data) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			height: 300,
			width: Infinity,
			resizeHandles: ["s"],
			maxConstraints: [Infinity, windowDimensions.height * 0.9],
			minConstraints: [Infinity, 40],
		};
	}
	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
