import React from 'react';
import ReactDOM from 'react-dom';
import AddBookList from './AddBookList';
import AddInput from './AddInput';

/*
 * Should be accessible by only authenticated users.
 *
 */

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: ''
        };
    }
    render() {
        return (
            <div>
                <AddInput searchBook={this.props.searchBook} />
                <AddBookList bookList={this.props.booksResult} add={true} remove={false} />
            </div>
        );
    }
}

export default AddBook;
