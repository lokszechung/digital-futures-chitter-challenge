import Peeps from "../../components/Peeps/Peeps";
import "./HomeView.css";

// const colours = [
// 	{ bgColor: "#0079FF", textColor: "#FFFFFF" },
// 	{ bgColor: "#0EFFBD", textColor: "#000000" },
// 	{ bgColor: "#F6FA70", textColor: "#000000" },
// 	{ bgColor: "#FF0060", textColor: "#FFFFFF" },
// 	{ bgColor: "#8BB8E8", textColor: "#000000" },
// 	{ bgColor: "#F7D060", textColor: "#000000" },
// 	{ bgColor: "#FF864F", textColor: "#FFFFFF" },
// 	{ bgColor: "#178B6D", textColor: "#FFFFFF" },
// ];

const HomeView = ({ name }) => {
	return (
		<div className="home">
			<Peeps name={name} />

			{/* {colours.map((color) => {
				return (
					<div
						className="colour"
						key={color}
						style={{ backgroundColor: color.bgColor, color: color.textColor }}
					>
						BA
					</div>
				);
			})} */}
		</div>
	);
};

export default HomeView;
