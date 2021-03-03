import './Table.css';
import React, { Component } from 'react';
import { connect,useSelector} from 'react-redux';
import * as actions from '../../actions';

class Table extends Component{
    state={
        movieList:[]
    };
    editClicked(index){
        let movieList=[...this.state.movieList];
        movieList[index].isEditable=!movieList[index].isEditable;
        this.setState({movieList:movieList});
    }
    editText(index,event){
        let movieList=[...this.state.movieList];
        movieList[index][event.target.name]=event.target.value;
        this.setState({movieList:movieList});
        
    }
    doneClicked(index,event){
       this.editClicked(index,event);
       this.props.setdata({movieList:this.state.movieList});
    }
    deleteClicked(index){
        let movieList=[...this.state.movieList];
        movieList.splice(index,1);
        this.props.setdata({movieList:movieList});
    }
    static getDerivedStateFromProps(props){
        let movieList=[...props.data.movieList];
        return{movieList:movieList};
    }
    render(){
        let rowVals=this.state.movieList.map((el,index)=>{
            return(
                <tr>
                <td>{el.isEditable?<input type='text' value={el.movieName} onChange={this.editText.bind(this,index)} name='movieName'/>:el.movieName}</td>
                <td>{el.directorName}</td>
                <td class='actions'>
                {el.isEditable?
                <button onClick={this.doneClicked.bind(this,index)}>Done</button>
                :
                <div>
                <button className='add-movie' onClick={this.editClicked.bind(this,index)}>Edit</button>
                <button className='delete-movie' onClick={this.deleteClicked.bind(this,index)}>Delete</button>
                </div>
                }
                    
                </td>
                </tr>
            );
            })
        return(
            <div className='table'>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                    {rowVals}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps  = (store) => {
    return {
        data: store.data,
      }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        setdata: (data) => dispatch(actions.setdata(data))
    }
  }
export default connect(mapStateToProps , mapDispatchToProps)(Table);