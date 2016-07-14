import React from 'react';
import BookList from './BookList';

class UserBooks extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //this.props.getUserBooks();
    }
    render() {
        return (
            <div>
                <h5>Your Books</h5>
                <BookList 
                    bookList={this.props.userBooks} 
                    use={'owner'}
                    add={false} 
                    remove={true} 
                    detail={true} 
                    link={'mybooks'}
                />
            </div>
        );
    }
}

export default UserBooks;