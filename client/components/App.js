import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div>
                <h3>App</h3>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;