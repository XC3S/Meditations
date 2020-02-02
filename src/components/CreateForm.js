import React from 'react';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="new-meditation">What needs to be done?</label>
                <input id="meditation" onChange={this.handleChange} value={this.state.text} />
                <button>Add</button>
            </form>
        )
    }
    
    
    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        
        await this.props.createMeditation(this.state.text);
     
        this.setState(state => ({
            text: ''
        }));
    }
}

export default CreateForm;