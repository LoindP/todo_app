import React,{Component} from 'react'

import './item-add-form.css'

export default class ItemAddForm extends Component{

    state = {
        label: ''
    };

    onLabelChange=({target})=>{
        this.setState({
            label: target.value
        });
    };

    onSubmitForm=(e)=>{
        e.preventDefault();
        this.props.onAddTodo(this.state.label);
        this.setState({
            label: '',
        });
    }

    render(){
        return (
            <form className="item-add-form d-flex"
                    onSubmit={this.onSubmitForm}
                    >
                <input 
                    type='text'
                    placeholder = 'Enter name todo' 
                    className = 'form-control'
                    onChange={this.onLabelChange}
                    value={this.state.label}/>
                <button
                    className='btn btn-outline-primary'>
                        additem
                </button>
            </form>
        )
    }
}
