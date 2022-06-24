import React, { useEffect, useRef } from "react";
import "./preview.css";

interface IPreviewProps {
	code: string;
	error: string;
}

const html = `
		<html>
		<head></head>
		<body>
			<div id="root"></div>
			<script>
				const handleError = (error) =>{
					const root = document.querySelector('#root')
					root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>'
					console.error(error)
				};
				window.addEventListener('message', (event) =>{
					try{
						eval(event.data)
					}catch(error){
						handleError(error);
					}
				}, false);
				window.addEventListener('error', (event) =>{
					event.preventDefault();
					handleError(event.error);
				});
			</script>
		</body>
	</html>
	`;

const Preview: React.FC<IPreviewProps> = ({ code, error }) => {
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
			{error && <div className="preview-error">{error}</div>}
		</div>
	);
};

export default Preview;
