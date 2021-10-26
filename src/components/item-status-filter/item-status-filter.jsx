import React, {Component} from 'react'

export default class ItemStatusFilter extends Component{

    state = {
        all:true,
        done:false,
        active:false
    }

    onClickAll = ({target}) => {
        this.setState({all:true,done:false,active:false})
        this.props.onFilterItem('ALL');
    }

    onClickDone = ({target}) => {
        this.setState({all:false,done:true,active:false})
        this.props.onFilterItem('DONE');
        
    }

    onClickActive = ({target}) => {
        this.setState({all:false,done:false,active:true})
        this.props.onFilterItem('ACTIVE');
    }

    render(){

        let classNameAll = 'btn btn-outline-secondary';
        let classNameActive = 'btn btn-outline-secondary';
        let classNameDone = 'btn btn-outline-secondary';

        if(this.state.all){
            classNameAll+=' btn-info';
        }
        if(this.state.active){
            classNameActive+=' btn-info';
        }
        if(this.state.done){
            classNameDone+=' btn-info';
        }
        return (
            <div className = 'btn-group'>
                <button type = 'button'
                        className = {classNameAll}
                        onClick = {this.onClickAll}
                    >All</button>
                <button type = 'button'
                        className = {classNameActive}
                        onClick = {this.onClickActive}
                    >Active</button>
                <button type = "button"
                        className = {classNameDone}
                        onClick = {this.onClickDone}
                    >Done</button>
            </div>
        );
    }
}

