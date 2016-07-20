import React from 'react';
import ReactDOM from 'react-dom';

class AddInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: ''
        };
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.userInput).focus();
    }
    handleInput(e) {
        this.setState({
            title: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.searchBook(this.state.title);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input ref='userInput' type='text' onChange={this.handleInput}/>
                    <button className='btn waves-effect waves-light' type='submit' >Submit</button>
                </form>
            </div>
        );
    }
}

export default AddInput;

