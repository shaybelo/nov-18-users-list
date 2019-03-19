import React, {Component} from 'react';
import { UsersService } from "./UsersService";
import {UsersList} from "./UsersList";
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
		return (
			<div className="App">
				<form onSubmit={(event) => this.createUser(event)}>
					<input ref={this.inputEl} placeholder="Enter new user"/>
				</form>
				<UsersList users={this.state.users} onDeleteUser={(user) => this.deleteUser(user)}/>
			</div>
		);
	}
}

export default App;
