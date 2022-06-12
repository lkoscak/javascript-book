import React, { useEffect, useRef } from "react";
import "./preview.css";

interface IPreviewProps {
	code: string;
}

const html = `
		<html>
		<head></head>
		<body>
			<div id="root"></div>
			<script>
				window.addEventListener('message', (event) =>{
					console.log(event.data)
					try{
						eval(event.data)
					}catch(error){
						const root = document.querySelector('#root')
						root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>'
						console.error(error)
					}
				}, false);
			</script>
		</body>
	</html>
	`;

const Preview: React.FC<IPreviewProps> = ({ code }) => {
	const iframeRef = useRef<any>(null);
	useEffect(() => {
		iframeRef.current.srcdoc = html;
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, "*");
		}, 50);
	}, [code]);
	return (
		<div className="preview-wrapper">
			<iframe
				ref={iframeRef}
				title="code preview"
				frameBorder="1"
				srcDoc={html}
				sandbox="allow-scripts"
			></iframe>
		</div>
	);
};

export default Preview;
