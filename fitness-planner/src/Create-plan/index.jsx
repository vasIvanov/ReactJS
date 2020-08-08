import React, {useState, useCallback, useContext} from 'react';
import {Form, Alert} from 'react-bootstrap';
import './index.css';
import validate from './schema';
import planService from '../services/plan-service';
// import widget from './cloudinaryWidget';
import DynamicInputField from '../DynamicInputField'
import { useEffect } from 'react';
import Modal, {handleShow} from './Modal';
import Header from '../Header';
import { userContext } from '../userContext';

const CreatePlan = ({history, showChange, editPlan}) => {
    const userValue = useContext(userContext)
    const [planName, setPlanName] = useState('');
    const [planImage, setPlanImage] = useState('');
    const [level, setLevel] = useState('Select ...');
    const [goal, setGoal] = useState('Select ...');
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
    const [urlStatus, setUrlStatus] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    const nullDays = () => { setDay1(''); setDay2(''); setDay3(''); setDay4(''); setDay5(''); setDay6(''); setDay7('');}
    const userId = (userValue && userValue._id) || localStorage.getItem('_id') || null;
    useEffect(() => {
        if(editPlan) {
            setPlanName(editPlan.name);
            setPlanImage(editPlan.imageUrl);
            setLevel(editPlan.level);
            setGoal(editPlan.goal);
            setPlanDetails(editPlan.details);
            setDays(Object.keys(editPlan.exercises).length.toString());
           
        }
    }, [editPlan])
    
    const hanleUrlChange = (e) => {

        let value = e.target.value
        setPlanImage(value);
        setUrlStatus(false); 
        setButtonActive(false);
        
    } 

    const setError = useCallback(() => {
        setImageUrlError('Invalid URL!')
    }, [])

    const setSuccess = () => {
        setImageUrlError('')
        setUrlStatus(true);
    }

    // const myWidget = widget(setPlanImage);
    useEffect(() => {
        if(planImage) {
            const img = new Image();
            img.onload = setSuccess ;
            img.onerror = setError ;
            img.src = planImage;
        }

        if(days === '2' && urlStatus) {
            setButtonActive(day1 !== '' && day2 !== '' && urlStatus)
        } else if(days === '3') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && urlStatus) 
        } else if(days === '4') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='' && urlStatus)
        } else if(days === '5') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='' && day5 !== '' && urlStatus);
        } else if(days === '6') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='' && day5 !== '' && day6 !== '' && urlStatus);
        } else if(days === '7') {
            setButtonActive(day1 !== '' && day2 !== '' && day3 !=='' && day4 !=='' && day5 !== '' && day6 !== '' && day7 !== '' && urlStatus);
        } 
    }, [days, day1, day2, day3, day4, day5, day6, day7, urlStatus, planImage, setError])

    const handleSelect = (e) => {
        if(!editPlan) {
            nullDays()
        }
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
            author: userId,
            imageUrl: planImage
        };
        console.log(planName);
        
        validate(planName, planImage, planDetails)
            .then(() => {
                if(editPlan) {
                    const planId = editPlan._id;
                    planService.update(planId, data).then(plan => {
                        console.log(plan);
                        
                        if(plan.errMsg) {
                            setServerError(plan.errMsg);
                            window.scrollTo(0, 0);
                            return;
                        }
                        showChange();
                        history.push('/');
                    })
                } else {
                    planService.create(data).then((e) => {
                        if(e.errMsg) {
                            setServerError(e.errMsg);
                            window.scrollTo(0, 0);
                            return;
                        }
                        showChange();
                        history.push('/');
                    })
                }
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
            <Header isLogged={true}  bgColor='dark'/>
            <div className="wrapper">
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Plan name</Form.Label>
                        <Form.Control defaultValue={planName} onChange={(e) => setPlanName(e.target.value)} type="text" />
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
                        <Form.Label>Plan Image Url (the image must be a landscape not portrait otherwise it may not be displayed properly)</Form.Label>
                        <Form.Control defaultValue={planImage} autoComplete="off"  className='custom-input' onChange={hanleUrlChange} type="text" />
                        {urlStatus ? <Modal  planImage={planImage}/> : null}
                        {imageUrlError ? <Alert className='custom-alert' variant={'danger'}>{imageUrlError}</Alert> : null}
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Complexity level</Form.Label>
                        <Form.Control value={level} onChange={(e) => setLevel(e.target.value)} as="select">
                        <option>Select ...</option>
                        <option>Beginner</option>
                        <option>Advanced</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect4">
                        <Form.Label>Select Plan Training Days</Form.Label>
                        <Form.Control value={days} onChange={handleSelect} as="select" >
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
                        <Form.Control value={goal} onChange={(e) => setGoal(e.target.value)} as="select">
                        <option>Select ...</option>
                        <option>Muscle gain</option>
                        <option>Weight loss</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea6">
                        <Form.Label>Plan details</Form.Label>
                        <Form.Control defaultValue={planDetails} onChange={(e) => setPlanDetails(e.target.value)} as="textarea" rows="3" />
                        {detailsError ? <Alert variant={'danger'}>{detailsError}</Alert> : null}
                    </Form.Group>
                </Form>
                {days === '2' ? <div className="days-table">
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day1) || ''} day={'1'} setDay1={setDay1}/>
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day2) || ''} day={'2'} setDay2={setDay2}/>
                </div> : null}
                {days === '3' ? 
                <div className="days-table"> 
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day1) || ''} day={'1'} setDay1={setDay1}/>
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day2) || ''} day={'2'} setDay2={setDay2}/>
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day3) || ''} day={'3'} setDay3={setDay3}/>
                </div>
                : null}
                {days === '4' ? 
                <div className="days-table"> 
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day1)} day={'1'} setDay1={setDay1}/>
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day2)} day={'2'} setDay2={setDay2}/>
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day3)} day={'3'} setDay3={setDay3}/>
                    <DynamicInputField dayValue={(editPlan && editPlan.exercises && editPlan.exercises.day4)} day={'4'} setDay4={setDay4}/>
                </div>
                : null}
                {days === '5' ? 
                <div className="days-table"> 
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day1} day={'1'} setDay1={setDay1}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day2} day={'2'} setDay2={setDay2}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day3} day={'3'} setDay3={setDay3}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day4} day={'4'} setDay4={setDay4}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day5} day={'5'} setDay5={setDay5}/>
                </div>
                : null}
                {days === '6' ? 
                <div className="days-table"> 
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day1} day={'1'} setDay1={setDay1}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day2} day={'2'} setDay2={setDay2}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day3} day={'3'} setDay3={setDay3}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day4} day={'4'} setDay4={setDay4}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day5} day={'5'} setDa5={setDay5}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day6} day={'6'} setDay6={setDay6}/>
                </div>
                : null}
                {days === '7' ? 
                <div className="days-table"> 
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day1} day={'1'} setDay1={setDay1}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day2} day={'2'} setDay2={setDay2}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day3} day={'3'} setDay3={setDay3}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day4} day={'4'} setDay4={setDay4}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day5} day={'5'} setDay5={setDay5}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day6} day={'6'} setDay6={setDay6}/>
                    <DynamicInputField dayValue={editPlan && editPlan.exercises && editPlan.exercises.day7} day={'7'} setDay7={setDay7}/>
                </div>
                : null}
                {editPlan ? <button className='create-button' type="button" onClick={handleSubmit}>Edit</button>
                :
                buttonActive ? <button className='create-button' type="button" onClick={handleSubmit}>Create</button> : <button className='create-button' disabled type="button" onClick={handleSubmit}>Create</button>
                }
                
            </div>
        </React.Fragment>
    ) 
}

export default CreatePlan;