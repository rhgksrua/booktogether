import React from 'react';
import ReactDOM from 'react-dom';

class Me extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleStreet = this.handleStreet.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleZip = this.handleZip.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const userInfo = this.props.userInfo;
        console.log('const Me', userInfo);
        this.state = {
            email: userInfo.email,
            street: userInfo.street,
            city: userInfo.city,
            zip: userInfo.zip
        };
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.userInput).focus();
    }
    componentWillReceiveProps(nextProps) {
        const userInfo = nextProps.userInfo;
        this.setState({
            email: userInfo.email,
            street: userInfo.street,
            city: userInfo.city,
            zip: userInfo.zip
        });
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    handleStreet(e) {
        this.setState({
            street: e.target.value
        });
    }
    handleCity(e) {
        this.setState({
            city: e.target.value
        });
    }
    handleZip(e) {
        this.setState({
            zip: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.updateAddress(this.state);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='input-field'>
                        <p>email</p>
                        <input value={this.state.email} id='email' ref='userInput' type='text' onChange={this.handleEmail}/>
                    </div>
                    <div className='input-field'>
                        <p>street</p>
                        <input value={this.state.street} type='text' onChange={this.handleStreet}/>
                    </div>
                    <div className='input-field'>
                        <p>city</p>
                        <input value={this.state.city} type='text' onChange={this.handleCity}/>
                    </div>
                    <div className='input-field'>
                        <p>zip</p>
                        <input value={this.state.zip} type='text' onChange={this.handleZip}/>
                    </div>
                    <button className='btn waves-effect waves-light' type='submit' >Submit</button>
                </form>
            </div>
        );
    }
}

export default Me;
