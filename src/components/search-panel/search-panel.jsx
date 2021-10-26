import React,{Component} from 'react';
import './search-panel.css'

export default class SearchPanel extends Component {
    state = {
        term: '',
    }

    onSearchChange = ({target})=>{
        this.setState({term:target.value})

        this.props.onSearchChange(target.value);
    }


    render(){

        return (
                <input 
                    placeholder="Search" 
                    className= "form-control search-input"
                    onChange={this.onSearchChange}
                    // onChange={this.props.onSearch}
                    value={this.state.term}>
                </input>
            )
    }
}