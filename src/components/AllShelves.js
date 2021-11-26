import React from "react";
import Shelf from "./Shelf";

const AllShelves = (props) => {
	const currentlyReading = props.books.filter(
		(b) => b.shelf === "currentlyReading"
	);
	const wantToRead = props.books.filter((b) => b.shelf === "wantToRead");
	const read = props.books.filter((b) => b.shelf === "read");

	return (
		<>
			<Shelf
				title="Currently Reading"
				books={currentlyReading}
				update={props.update}
			/>
			<Shelf title="Want To Read" books={wantToRead} update={props.update} />
			<Shelf title="Read" books={read} update={props.update} />
		</>
	);
};

export default AllShelves;
