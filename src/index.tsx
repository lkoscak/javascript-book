import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";

import CodeCell from "./components/CodeCell";
import TextEditor from "./components/TextEditor";

const App = () => {
	return (
		<>
			<TextEditor></TextEditor>
		</>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
