
/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */
//  es5-shim.js是给Javascript engine打补丁的, 所以必须最先加载。
//  es5-shim 如实地模拟EcmaScript 5的函数，比如Array.prototype.forEach；而es5-sham是尽可能滴模拟EcmaScript 5的函数，比如 Object.create
require('es5-shim');
require('es5-shim/es5-sham');

/**
 * CANNOT use `import` to import `react` or `react-dom`,
 * because `import` will run `react` before `require('es5-shim')`.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

const React = require('react');
const ReactDOM = require('react-dom');

import marked from 'marked';

const data = [
	{id: 1, author: "Pete Hunt", text: "This is one comment"},
	{id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

function createXmlHttp() {
	let xmlHttp = null;
	if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
	return xmlHttp;
}

const WelcomeBox = React.createClass({
	render: function() {
    	return (
      		<div className="comment">
        		<p>welcome {this.props.name}</p>
      		</div>
    	);
  	}
});

const Timer = React.createClass({
	getInitialState: function () {
		return {secondsElapsed: 0}
	},
	tick: function () {
		this.setState({secondsElapsed: this.state.secondsElapsed + 1});
	},
	componentDidMount: function () {
		this.interval = setInterval(this.tick, 1000);
	},
	componentWillUnmount: function () {
		clearInterval(this.interval);
	},
	render: function() {
		return (
			<div>
				<h3>welcome {this.props.name}</h3>
				<h3>Time Elapsed: {this.state.secondsElapsed} seconds.</h3>
			</div>
		);
	}
});

const Comment = React.createClass({
	rawMarkup: function() {
		const __html = marked(this.props.children.toString(), {sanitize: true});
		return { __html };
	},
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

const CommentList = React.createClass({
	render: function() {
		const commentNodes = this.props.data.map((comment) => {
			return (
				<Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
			)
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

const CommentForm = React.createClass({
	getInitialState: () => {
		return {author: '', text: ''};
	},
	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		const author = this.state.author.trim();
		const text = this.state.text.trim();
		if(!author || !text) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
				<input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
				<input type="submit" value="Post" />
			</form>
		);
	}
});

const CommentBox = React.createClass({
	getInitialState: () => {
		return {data: []}
	},
	loadCommentsFromServer: function() {
		const xmlHttp = createXmlHttp();
		if(xmlHttp) {
			xmlHttp.onreadystatechange = () => {
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					console.log(xmlHttp.responseText);
					this.setState({data: [{id: 1, author: "Pete Hunt", text: "This is one comment"}]});
				}
			};
			xmlHttp.open('get', this.props.url, true);
			xmlHttp.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
			const body = JSON.stringify({name: 'jack'});
			xmlHttp.send(body);
		}
	},
	handleCommentSubmit: function(comment) {
		const xmlHttp = createXmlHttp();
		if(xmlHttp) {
			xmlHttp.onreadystatechange = () => {
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					const data = JSON.parse(xmlHttp.responseText);
					console.log(xmlHttp.responseText);

					this.setState({data: data});
				}
			};
			xmlHttp.open('post', this.props.url, true);
			xmlHttp.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
			const body = JSON.stringify(comment);
			xmlHttp.send(body);
		}
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
		// setInterval(this.loadCommentsFromServer, this.props.pollInterval)
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		);
	}
});


ReactDOM.render(
  // <Timer name="Jone"/>,
  <CommentBox url="http://192.168.204.49:3001/api/comments" pollInterval={2000}/>,
  // <MarkdownEditor/>,
  document.getElementById('root')
);
