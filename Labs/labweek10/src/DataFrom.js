import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';

export default class FormEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: {},
            records: [],
            show: false,
            setShow: false
        };
        
        this.provinces = ["Ontario", "Quebec", "Nova Scotia", "New Brunswick", "Manitoba", "British Columbia", "Prince Edward Island", "Saskatchewan", "Alberta", "Newfoundland and Labrador", "Northwest Territories", "Nunavut", "Yukon"];
        this.provinces.sort();
    }

    handleClose = () => this.setState({show: false});
    handleShow = event => {
        event.preventDefault();
        let id = event.target.value;
        this.setState({view: this.state.records[id]});
        this.setState({show: true});
    }

    onSubmitForm = event => {
        event.preventDefault();
        let values=event.target.form;
        let savedRecords = this.state.records;

        savedRecords.push({
            email: values[0].value,
            fullName: values[1].value,
            address_1: values[2].value,
            address_2: values[3].value,
            city: values[4].value,
            province: values[5].value,
            zipcode: values[6].value,
            agreement: values[7].value
        });
        this.setState({records: savedRecords});
        // display modal
        this.setState({show: true});
    }
    
    onValueChanged = event => {
        event.preventDefault();
        this.setState({form: {[event.target.name]: event.target.value}})
    }
    
    render() {
        return (
            <>
                <div className='text-center mt-3 mb-0'>
                    <h2>Data Entry Form</h2>
                </div>
                <div className='bg-white rounded p-4 m-5'>
                    <form>
                        <div className='row'>
                            <div className="mb-3 col-md-6">
                                <input onChange={e => this.onValueChanged(e)} type="email" className="form-control" id="email_input" placeholder="name@example.com" name="email" />
                            </div>
                            <div className="mb-3 col-md-6">
                                <input type="text" onChange={e => this.onValueChanged(e)} className="form-control" id="fulllname_input" placeholder="Full Name" name="fullName" />
                            </div>
                        </div>
                        <div>
                            <div className="mb-3 col-12">
                                <input type="text" onChange={e => this.onValueChanged(e)} className="form-control" id="address_1_input" placeholder="Address" name="address_1" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="mb-3 col-12">
                                <input type="text" onChange={e => this.onValueChanged(e)} className="form-control" id="address_2" placeholder="Apartment or Suite number" name="address_2" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="mb-3 col-md-4">
                                <input type="text" onChange={e => this.onValueChanged(e)} className="form-control" id="city_input" placeholder="City" name="city" />
                            </div>
                            <div className="col-md-4">
                                <select 
                                    className='form-select'id="province_input" name='province' value="Ontario" onChange={this.onValueChanged}>
                                    { 
                                        this.provinces.map((prov, index) => (
                                            <option key={index} value={prov}>{prov}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 col-md-4">
                                <input type="text" onChange={e => this.onValueChanged(e)} className="form-control" id="postcode_input" placeholder="Postal Code" name="zipcode" />
                            </div>
                        </div>
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={() => {
                                    this.setState({form: {agreement: !this.state.form.agreement}});
                                }} label="Agree Terms and Condition?" />
                            </Form.Group>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button onClick={e => this.onSubmitForm(e)} className={'btn btn-primary me-2 col-3'} type="submit">Submit</button>
                        </div>
                    </form>
                </div>

                {/* create a model with the data entered on int */}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Records</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.records.map((record, index) => (
                            <div key={index}>
                                <p><strong>Email:</strong> {record.email}</p>
                                <p><strong>Full Name:</strong> {record.fullName}</p>
                                <p><strong>Address:</strong> {record.address_1}</p>
                                <p><strong>Apt. or Suit:</strong> {record.address_2}</p>
                                <p><strong>City:</strong> {record.city}</p>
                                <p><strong>Province:</strong> {record.province}</p>
                                <p><strong>Postal Code:</strong> {record.zipcode}</p>
                                <p><strong>Agreement:</strong> {record.agreement ? 'Yes' : 'No'}</p>
                                <hr />
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }
}
