import React from "react";
import Book from "./Book";

const Shelf = (props) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map((b) => (
						<li key={b.id}>
							<Book book={b} changeShelf={props.update} />
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default Shelf;
