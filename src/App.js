import React, {Component} from 'react';
import { UsersService } from "./UsersService";
import {UsersList} from "./UsersList";
import './App.css';

const usersService = new UsersService();

class App extends Component {
	constructor() {
		super();

		this.fetchUsers();
		this.nameEl = React.createRef();
		this.lastNameEl = React.createRef();
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
			name: this.nameEl.current.value,
			lastName: this.lastNameEl.current.value
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
					<input ref={this.nameEl} placeholder="Enter name"/>
					<input ref={this.lastNameEl} placeholder="Enter last name"/>
					<button>Submit</button>
				</form>
				<UsersList users={this.state.users} onDeleteUser={(user) => this.deleteUser(user)}/>
			</div>
		);
	}
}

export default App;
