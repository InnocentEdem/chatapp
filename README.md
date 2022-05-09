# Live chat App using the WebSocket protocol

This is the frontend of the Chat App web application, built with Typescript, React and material UI.

## Available Scripts

The project was built with Create React App, using Template typescript. To start the App, run npm start

## Login
Login is implemented using the Auth0 authentication service. Storage, authentication, and authorization of login credentials handled by Auth0. The 
authorization workflow is default. Some configration was necessary on the dashboard for the verification of app credentials.

## Logout
Logout is similarly handled by Auth0,trigered by user action, or on the expiration of the authentication token.

## Chat dashboard
The chat Dashboard includes a contact panel to the left, and the main chat area - to the right of the contact panel.
On the top of the contact panel is the current user email id, and avatar. Any user active at time of login is shown below the current user.
The list is scrollable. Active users are arranged column wise.
A user in whose chat is currently open in the chat area is higlighted.
A blue Badge is applied to the avatar of a user with a new unread message. 

## Main Chat Area 
The main chat area is to the right of the contact panel.
The top of the main chat area has an info bar that shows the email and avatar of selected chat.
The information bar also features a logout icon that logs out and redirects the user on click.The logout icon has a tooltip with the text logout.

Sent chats are shown to the left of the chat area, and received chats are shown to the left.

To start chatting, select a user, type some text into the input field, and click the send icon. Alternatively, press the Enter key to send.

## Blocking a user
Click on the icon to the left of the bar of the user and select the block option. That user is blocked intantly and a confirmation alert is shown.
To unblock a user, follow the same process and select the unblock option.





