import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import WeekTable from './weekTable';
import './index.css';

const CreatePlan = () => {
    const [planName, setPlanName] = useState('');
    const [planImage, setPlanImage] = useState('');
    const [level, setLevel] = useState('');
    const [goal, setgoal] = useState('');
    const [planDetails, setPlanDetails] = useState('');
    const [monday1, setMonday1] = useState('');
    const [monday2, setMonday2] = useState('');
    const [monday3, setMonday3] = useState('');
    const [monday4, setMonday4] = useState('');
    const [monday5, setMonday5] = useState('');
    const [monday6, setMonday6] = useState('');
    const [tue1, setTue1] = useState('');
    const [tue2, setTue2] = useState('');
    const [tue3, setTue3] = useState('');
    const [tue4, setTue4] = useState('');
    const [tue5, setTue5] = useState('');
    const [tue6, setTue6] = useState('');
    const [thu1, setThu1] = useState('');
    const [thu2, setThu2] = useState('');
    const [thu3, setThu3] = useState('');
    const [thu4, setThu4] = useState('');
    const [thu5, setThu5] = useState('');
    const [thu6, setThu6] = useState('');
    const [fri1, setFri1] = useState('');
    const [fri2, setFri2] = useState('');
    const [fri3, setFri3] = useState('');
    const [fri4, setFri4] = useState('');
    const [fri5, setFri5] = useState('');
    const [fri6, setFri6] = useState('');
    const logResult = () => {
        console.log(fri1);
        console.log(fri2);
        console.log(fri3);
        console.log(fri4);
        console.log(fri5);
        console.log(fri6);
        
    }
    return (
        <React.Fragment>
            <div className="wrapper">
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Plan name</Form.Label>
                        <Form.Control onChange={(e) => setPlanName(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Plan Image Url</Form.Label>
                        <Form.Control onChange={(e) => setPlanImage(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Complexity level</Form.Label>
                        <Form.Control onChange={(e) => setLevel(e.target.value)} as="select">
                        <option>Select ...</option>
                        <option>Beginner</option>
                        <option>Advanced</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Plan goal</Form.Label>
                        <Form.Control onChange={(e) => setgoal(e.target.value)} as="select">
                        <option>Select ...</option>
                        <option>Muscle gain</option>
                        <option>Weight loss</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Plan details</Form.Label>
                        <Form.Control onChange={(e) => setPlanDetails(e.target.value)} as="textarea" rows="3" />
                    </Form.Group>
                </Form>
                <div className="days-table">
                    <WeekTable setEx1={setMonday1}  setEx2={setMonday2} setEx3={setMonday3} setEx4={setMonday4}  setEx5={setMonday5} setEx6={setMonday6} day="Day 1"/>
                    <WeekTable setEx1={setTue1}  setEx2={setTue2} setEx3={setTue3} setEx4={setTue4}  setEx5={setTue5} setEx6={setTue6}  day="Day 2"/>
                </div>
                <div className="days-table">
                    <WeekTable setEx1={setThu1}  setEx2={setThu2} setEx3={setThu3} setEx4={setThu4}  setEx5={setThu5} setEx6={setThu6} day="Day 4"/>
                    <WeekTable setEx1={setFri1}  setEx2={setFri2} setEx3={setFri3} setEx4={setFri4}  setEx5={setFri5} setEx6={setFri6} day="Day 5"/>
                </div>

                <button type="button" onClick={logResult}>Create</button>
            </div>
        </React.Fragment>
    )
}

export default CreatePlan;