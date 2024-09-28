import React from 'react'
import '../../App.css';

class NewMsg extends React.Component {

    constructor(props) {
		super(props);
        this.state = {
            newMsg: ''
        }
    }

    updateMsg = (event) => {
        event.preventDefault();
        const {value} = event.target;
        this.setState({newMsg: value});
    }

    onClickSend = () => {
        this.props.callBackParent(this.state.newMsg)
        this.setState({newMsg: ''})
    }

    render() {

        return(
            <div>
                <textarea
                    style={{width: '60vw', minHeight: '10px'}}
                    onChange={this.updateMsg}
                    value={this.state.newMsg}
                    placeholder="Novo sporočilo"
                    maxLength="990">
                </textarea>
                <br/>
                <button className = 'btn' style = {{border: '2px solid #ccc'}} onClick = {this.onClickSend}>SEND</button>

            </div>
        )
    }


}

export default NewMsg