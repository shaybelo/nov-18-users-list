import React, {Component} from 'react';
import { UsersService } from "./UsersService";
import './App.css';

const usersService = new UsersService();

class App extends Component {
	constructor() {
		super();

		this.fetchUsers();
		this.inputEl = React.createRef();
		this.state = {
			users: null,
		}
	}

	async fetchUsers() {
		const users = await usersService.fetchUsers();
		this.setState({ users });
	}

	async createUser(event) {
		event.preventDefault();

		await usersService.createUser({
			name: this.inputEl.current.value
		});

		this.fetchUsers();
	}

	async deleteUser(user) {
		await usersService.deleteUser(user._id);
		this.fetchUsers();
	}

	render() {
		if(!this.state.users)
			return <p>Loading Users...</p>;

		return (
			<div className="App">
				<form onSubmit={(event) => this.createUser(event)}>
					<input ref={this.inputEl} placeholder="Enter new user"/>
				</form>
				<ul>
					{
						this.state.users
							.map((user, i) =>
								<li key={i}>
									{user.name}
									<button
										onClick={() => this.deleteUser(user)}
									>
										Delete
									</button>
								</li>
							)
					}
				</ul>
			</div>
		);
	}
}

export default App;
