import React, {useState} from 'react';
import {Form, Alert} from 'react-bootstrap';
import './index.css';
import validate from './schema';
import postService from '../services/plan-service';
// import widget from './cloudinaryWidget';
import Test from '../DynamicInputField'
import { useEffect } from 'react';
import {planContext} from '../planContext';

const CreatePlan = ({history, showChange}) => {
    const [planName, setPlanName] = useState('');
    const [planImage, setPlanImage] = useState('');
    const [level, setLevel] = useState('');
    const [goal, setgoal] = useState('');
    const [planDetails, setPlanDetails] = useState('');
    const [nameError, setNameError] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');
    const [detailsError, setDetailsError] = useState('');
    const [serverError, setServerError] = useState('');
    const [days, setDays] = useState('');
    const [day1, setDay1] = useState('');
    const [day2, setDay2] = useState('');
    const [day3, setDay3] = useState('');
    const [day4, setDay4] = useState('');
    const [day5, setDay5] = useState('');
    const [day6, setDay6] = useState('');
    const [day7, setDay7] = useState('');
    const [buttonActive, setButtonActive] = useState(false);
    const nullDays = () => { setDay1(''); setDay2(''); setDay3(''); setDay4(''); setDay5(''); setDay6(''); setDay7('');}

    // const myWidget = widget(setPlanImage);
    useEffect(() => {
        if(days === '2') {
            setButtonActive(day1 !== '' && day2 !== '')
        } else if(days === '3') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='') 
        } else if(days === '4') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='')
        } else if(days === '5') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='' && day5 !== '');
        } else if(days === '6') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='' && day5 !== '' && day6 !== '');
        } else if(days === '7') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='' && day5 !== '' && day6 !== '' && day7 !== '');
        } 
    }, [days, day1, day2, day3, day4, day5, day6, day7])

    const handleSelect = (e) => {
        nullDays()
        setDays(e.target.value);
    }
    
    const handleSubmit = () => {
        const exercises= {
            day1, day2, day3, day4,day5, day6, day7
        };

        for(let propName in exercises) {
            if(exercises[propName] === '') {
                delete(exercises[propName]);
            }
        }
        
        setNameError('');
        setImageUrlError('');
        setDetailsError('');
        const data = {
            name: planName,
            level,
            goal,
            details: planDetails,
            exercises,
            imageUrl: planImage
        };
        validate(planName, planImage, planDetails)
            .then(() => {
                postService.create(data).then((e) => {
                    if(e.errMsg) {
                        setServerError(e.errMsg);
                        window.scrollTo(0, 0);
                        return;
                    }
                    showChange();
                    history.push('/');
                })
            })
            .catch(err => {
                err.inner.forEach(error => {
                if(error.path === 'planName') {
                    setNameError(error.message);
                } else if(error.path === 'planImage') {
                    setImageUrlError(error.message);
                } else if (error.path === 'planDetails') {
                    setDetailsError(error.message);
                }
                })
                window.scrollTo(0, 0);
            }) 
    }

    return (
        <React.Fragment>
            <div className="wrapper">
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Plan name</Form.Label>
                        <Form.Control onChange={(e) => setPlanName(e.target.value)} type="text" />
                        {nameError ? <Alert variant={'danger'}>{nameError}</Alert> : null}
                        {serverError ? <Alert variant={'danger'}>{serverError}</Alert> : null}
                    </Form.Group>
                    
                    {/* <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Plan Image Url</Form.Label>
                        <div>
                            <button type='button' onClick={() => myWidget.open()} id="upload_widget" className="cloudinary-button">Upload files</button>
                        </div>
                        {imageUrlError ? <Alert variant={'danger'}>{imageUrlError}</Alert> : null}
                    </Form.Group> */}
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Plan Image Url</Form.Label>
                        <Form.Control onChange={(e) => setPlanImage(e.target.value)} type="text" />
                        {imageUrlError ? <Alert variant={'danger'}>{imageUrlError}</Alert> : null}
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Complexity level</Form.Label>
                        <Form.Control onChange={(e) => setLevel(e.target.value)} as="select">
                        <option>Select ...</option>
                        <option>Beginner</option>
                        <option>Advanced</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect4">
                        <Form.Label>Select Plan Training Days</Form.Label>
                        <Form.Control onChange={handleSelect} as="select" >
                            <option>Select ...</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect5">
                        <Form.Label>Plan goal</Form.Label>
                        <Form.Control onChange={(e) => setgoal(e.target.value)} as="select">
                        <option>Select ...</option>
                        <option>Muscle gain</option>
                        <option>Weight loss</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea6">
                        <Form.Label>Plan details</Form.Label>
                        <Form.Control onChange={(e) => setPlanDetails(e.target.value)} as="textarea" rows="3" />
                        {detailsError ? <Alert variant={'danger'}>{detailsError}</Alert> : null}
                    </Form.Group>
                </Form>
                <planContext.Provider value={{setButtonActive}}>
                {days === '2' ? <div className="days-table">
                    <Test day={'1'} setDay1={setDay1}/>
                    <Test day={'2'} setDay2={setDay2}/>
                </div> : null}
                {days === '3' ? 
                <div className="days-table"> 
                    <Test day={'1'} setDay1={setDay1}/>
                    <Test day={'2'} setDay2={setDay2}/>
                    <Test day={'3'} setDay3={setDay3}/>
                </div>
                : null}
                {days === '4' ? 
                <div className="days-table"> 
                    <Test day={'1'} setDay1={setDay1}/>
                    <Test day={'2'} setDay2={setDay2}/>
                    <Test day={'3'} setDay3={setDay3}/>
                    <Test day={'4'} setDay4={setDay4}/>
                </div>
                : null}
                {days === '5' ? 
                <div className="days-table"> 
                    <Test day={'1'} setDay1={setDay1}/>
                    <Test day={'2'} setDay2={setDay2}/>
                    <Test day={'3'} setDay3={setDay3}/>
                    <Test day={'4'} setDay4={setDay4}/>
                    <Test day={'5'} setDay5={setDay5}/>
                </div>
                : null}
                {days === '6' ? 
                <div className="days-table"> 
                    <Test day={'1'} setDay1={setDay1}/>
                    <Test day={'2'} setDay2={setDay2}/>
                    <Test day={'3'} setDay3={setDay3}/>
                    <Test day={'4'} setDay4={setDay4}/>
                    <Test day={'5'} setDa5={setDay5}/>
                    <Test day={'6'} setDay6={setDay6}/>
                </div>
                : null}
                {days === '7' ? 
                <div className="days-table"> 
                    <Test day={'1'} setDay1={setDay1}/>
                    <Test day={'2'} setDay2={setDay2}/>
                    <Test day={'3'} setDay3={setDay3}/>
                    <Test day={'4'} setDay4={setDay4}/>
                    <Test day={'5'} setDay5={setDay5}/>
                    <Test day={'6'} setDay6={setDay6}/>
                    <Test day={'7'} setDay7={setDay7}/>
                </div>
                : null}
                </planContext.Provider >
                
                {buttonActive ? <button className='create-button' type="button" onClick={handleSubmit}>Create</button> : <button className='create-button' disabled type="button" onClick={handleSubmit}>Please Save The Changes</button>}
            </div>
        </React.Fragment>
    )
}

export default CreatePlan;