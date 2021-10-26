import React, {Component} from 'react';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AppHeader from '../app-header'
import ItemStatusFilter  from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css'


export default class App extends Component{

    idMax = 100;
    state = {
        todoData:[
            this.createTodoItem('Drink Coffe'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'DONE',
    }

    createTodoItem(label){
        return {
            label,
            important:false,
            done: false,
            id: this.idMax++,
        }
    }

    deleteItem= (id) =>{
        this.setState(({todoData})=>{
            const idx = todoData.findIndex((el)=>el.id===id);
            const newArray = [
                ...todoData.slice(0,idx),
                ...todoData.slice(idx+1)
            ];

            return{
                todoData: newArray,
            }
        })
    }

    addItem = (label) => {
        this.setState(({todoData})=>{
            let todo = this.createTodoItem(label);

            const newArray = [
                ...todoData,
                todo
            ]

            return{
                todoData: newArray,
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({todoData})=>{
            return{
                todoData: this.toggleProperty(todoData,id,"important"),
            }
        })
    };

    onToggleDone= (id)=> {
        this.setState(({todoData})=>{
             return {
                todoData:this.toggleProperty(todoData,id,"done"),
            }
        })
    }


    toggleProperty(arr,id,propName){
        const idx = arr.findIndex((el)=>el.id===id);

            const oldItem = arr[idx];
            const newItem = {...oldItem, [propName]:!oldItem[propName]}
            return [
                ...arr.slice(0,idx),
                newItem,
                ...arr.slice(idx+1),
            ];
    }
    onSearch = ({target}) =>{
        this.setState({term:target.value});
    }

    search(items,term,filter){
        if(!term && filter ==="ALL"){
            return items;
        }
        switch(filter){
            case "ALL": {
                return items.filter((item)=>item.label.toLowerCase().includes(term.toLowerCase()))
                
            }
            case "DONE":{
                return items.filter((item)=>{
                    if(item.label.toLowerCase().includes(term.toLowerCase())&& item.done) return true;
                    return false;
                })
            }
            case "ACTIVE":{
                return items.filter((item)=>{
                    if(item.label.toLowerCase().includes(term.toLowerCase())&& !item.done) return true;
                    return false;
                })
            }
            default: {
                return items;
            } 
        }
        
    }

    onSearchChange = (term) =>{
        this.setState({term})
    };

    onFilterItem = (filter) =>{
        this.setState({filter})
    }

    render(){

        const {todoData, term,filter} = this.state;

        const visibleItems = this.search(todoData, term,filter);
        
        const doneCount = todoData.filter((el)=>el.done).length;

        const todoCount = todoData.length - doneCount;

        return(
            <div className="todo-app">
                <AppHeader toDo={todoCount} done ={doneCount}/>
                <div className = "top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        onFilterItem = {this.onFilterItem}/>
                </div>
                <TodoList
                    todos = {visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleDone = {this.onToggleDone}
                    />
                <ItemAddForm
                    onAddTodo = {this.addItem}
                />
            </div>
        )
    }
}
