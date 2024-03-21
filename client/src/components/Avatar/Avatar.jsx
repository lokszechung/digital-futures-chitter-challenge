import "./Avatar.css";

const Avatar = ({ firstname, lastname }) => {
	// const { firstname, lastname } = author;
	// console.log(firstname, lastname);
	// console.log(author.firstname, author.lastname);
	return (
		firstname &&
		lastname && (
			<div className="avatar-container">
				<p className="avatar-name mb-0">
					{firstname[0]}
					{lastname[0]}
				</p>
			</div>
		)
	);
};

export default Avatar;
