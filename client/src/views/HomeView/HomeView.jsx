import Peeps from "../../components/Peeps/Peeps";
import "./HomeView.css";

const HomeView = ({ name }) => {
	return (
		<div className="home">
			<Peeps name={name} />
		</div>
	);
};

export default HomeView;
