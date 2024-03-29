import ViewPeep from "../../components/ViewPeep/ViewPeep";
import "./PeepView.css";

import { useParams } from "react-router-dom";

const PeepView = ({ name }) => {
	const { id } = useParams();

	return (
		<div className="view-peep">
			<ViewPeep id={id} name={name} />
		</div>
	);
};

export default PeepView;
