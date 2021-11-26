import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import AllShelves from "./components/AllShelves";
import Book from "./components/Book";
import * as BooksAPI from "./BooksAPI";
import { useDebounce } from "use-debounce/lib";
import "./App.css";

const BooksApp = () => {
	/* States */

	const [books, setBooks] = useState([]);
	const [bookMap, setBookMap] = useState(new Map());
	const [query, setQuery] = useState("");
	const [value] = useDebounce(query, 500);
	const [marged, setMarged] = useState([]);
	const [searchBooks, setSearchBooks] = useState([]);

	/* Effects */

	useEffect(() => {
		BooksAPI.getAll().then((data) => {
			setBooks(data);
			setBookMap(createMap(data));
		});
	}, []);

	useEffect(
		() => {
			const combined = searchBooks.map((book) => {
				console.log(bookMap);
				if (bookMap.has(book.id)) {
					return bookMap.get(book.id);
				} else {
					return book;
				}
			});
			setMarged(combined);
		},
		[searchBooks]
	);

	useEffect(
		() => {
			let isActive = true;
			if (value) {
				BooksAPI.search(value).then((data) => {
					if (data.error) {
					} else {
						if (isActive) {
							setSearchBooks(data);
						}
					}
				});
			}
			return () => {
				isActive = false;
				setSearchBooks([]);
			};
		},
		[value]
	);

	/* Functions */

	const createMap = (books) => {
		const map = new Map();
		books.map((book) => map.set(book.id, book));
		return map;
	};
	const updateShelf = (book, categoray) => {
		const update = books.map((b) => {
			if (b.id === book.id) {
				book.shelf = categoray;
				return book;
			}
			return b;
		});
		if (!bookMap.has(book.id)) {
			book.shelf = categoray;
			update.push(book);
		}
		setBooks(update);

		BooksAPI.update(book, categoray);
	};
	return (
		<div className="app">
			<Router>
				<Switch>
					{/* Search Page */}
					<Route exact path="/search">
						<div className="search-books">
							<div className="search-books-bar">
								<Link to="/">
									<button className="close-search">Close</button>
								</Link>
								<div className="search-books-input-wrapper">
									<input
										type="text"
										placeholder="Search by title or author"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
									/>
								</div>
							</div>
							<div className="search-books-results">
								<ol className="books-grid">
									{marged.map((b) => (
										<li key={b.id}>
											<Book book={b} changeShelf={updateShelf} />
										</li>
									))}
								</ol>
							</div>
						</div>
					</Route>
					{/* Home Page */}
					<Route exact path="/">
						<div className="list-books">
							<Header />
							<div className="list-books-content">
								<AllShelves books={books} update={updateShelf} />
							</div>
							<div className="open-search">
								<Link to="/search">
									<button>Add a book</button>
								</Link>
							</div>
						</div>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default BooksApp;
