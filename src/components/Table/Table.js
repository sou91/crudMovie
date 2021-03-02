import './Table.css';
import React, { Component } from 'react'

class Table extends Component{
    render(){
        let rowVals=this.props.movieList.map(el=>{
            return(
                <tr>
                <td>{el.movieName}</td>
                <td>{el.directorName}</td>
                <td class='actions'>
                    <button className='add-movie' onClick="">Edit</button>
                    <button className='add-movie' onClick="">Delete</button>
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
export default Table;