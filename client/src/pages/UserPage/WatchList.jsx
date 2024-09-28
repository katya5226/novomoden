import React from 'react';
import { connect } from 'react-redux';
import '../../App.css';


class WatchList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            listingIds: [1,2,4,6]
        };

    }

    abortController = new AbortController();
	componentDidMount() {
            fetch('/api/sessionroutes', {signal: this.abortController.signal})
			.then(res => res.json())
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        if(!this.state.listingIds.length) {
            return <div>NIČ SHRANJENEGA!</div>
        }
        else
        return (
            <div>
                {this.state.listingIds.map((adid, index) =>
                    <li key={index}>{adid}</li>)}
            </div>   
        );

    }

}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId
    };
  };


export default connect(mapStateToProps) (WatchList);

