import React from 'react';
import {Form, Table} from 'react-bootstrap';

const WeekTable = ({day, setEx1, setEx2, setEx3, setEx4, setEx5, setEx6}) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>{day}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>
                    <p>Exercise</p>
                    <textarea onChange={(e) => setEx1(e.target.value)} type="text" />
                </td>
                </tr>
                <tr>
                <td>2</td>
                <td>
                    <p>Exercise</p>
                    <textarea onChange={(e) => setEx2(e.target.value)} type="text" />
                </td>
                </tr>
                <tr>
                <td>3</td>
                <td>
                    <p>Exercise</p>
                    <textarea onChange={(e) => setEx3(e.target.value)} type="text" />
                </td>
                </tr>
                <tr>
                <td>4</td>
                <td>
                    <p>Exercise</p>
                    <textarea onChange={(e) => setEx4(e.target.value)} type="text" />
                </td>
                </tr>
                <tr>
                <td>5</td>
                <td>
                    <p>Exercise</p>
                    <textarea onChange={(e) => setEx5(e.target.value)} type="text" />
                </td>
                </tr>
                <tr>
                <td>6</td>
                <td>
                    <p>Exercise</p>
                    <textarea onChange={(e) => setEx6(e.target.value)} type="text" />
                </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default WeekTable;