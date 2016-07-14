import React from 'react';
import BookList from './BookList';

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: ''
        };
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
                    <input type='text' onChange={this.handleInput}/>
                    <button className='btn waves-effect waves-light' type='submit' >Submit</button>
                </form>
                <BookList bookList={this.props.booksResult} add={true} remove={false} />
            </div>
        );
    }
}

export default AddBook;