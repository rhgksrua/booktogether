import React from 'react';

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log('--- inside book detail props', props);
        this.getBook = this.getBook.bind(this);
    }
    getBook(id) {
        let books = this.props.books;
        console.log('--- books', this.props)
        return books.find(book => {
            return book.id === id;
        });
    }
    render() {
        let book = this.getBook(this.props.params.id);
        console.log(book);
        if (!book) {
            return (
                <div className='progress'>
                    <div className='indeterminate'></div>
                </div>
            );
        }
        return (
            <div className=''>
                <div className='card'>
                    <div className='card-content'>
                        <span className='card-title'>{book.volumeInfo.title}</span>
                        <p>Book Info</p>
                    </div>
                </div>
                {this.props.use === 'owner' &&
                <ul className='collection with-header'>
                    <li className='collection-header'><h5>Requests</h5></li>
                    <li className='collection-item'>Name of requester</li>
                </ul>
                }
                {this.props.use === 'requester' &&
                <button className='waves-effect waves-light btn'>REQUEST</button>
                }
                <p className='btn-container'>
                    <button className='btn'>Request</button>
                </p>
                <p>
                    <button className='btn'>I Have this!</button>
                </p>
            </div>
        );
    }
}

export default BookDetail;