import React, {Component} from 'react';

export class UsersList extends Component {
	render() {
		if(!this.props.users)
			return <p>Loading Users...</p>;

		return (
			<ul>
				{
					this.props.users
						.map((user, i) =>
							<li key={i}>
								{user.name}
								<button
									onClick={() => this.props.onDeleteUser(user)}>
									Delete
								</button>
							</li>
						)
				}
			</ul>
		);
	}
}