import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { postContactMessage } from "../service/ProjectService";

const ContactPage = () => {

    const toastRef = useRef(null)

    const initContact = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
    const [contact, setContact] = useState(initContact)
    const [checked, setChecked] = useState(false)
    const [sending, setSending] = useState(false)

    const inputChangeHandler = field => event => {
        setContact({...contact, [field]: event.target.value})
    }
    const checkboxChangeHandler = evt => {
        setChecked(evt.target.checked)
    }

    const buttonEnabled = contact.name && contact.email &&
        contact.subject && contact.message && checked && !sending

    const submitContact = async (event) => {
        setSending(true)
        const resp = await postContactMessage(contact)
        if (resp.status === 200) {
            setContact(initContact)
            setChecked(false)
            showPopup()
        } else {
            showError()
        }
        setSending(false)
        event.preventDefault()
        event.stopPropagation()
    }

    const showError = () => {
        const notification = {
            severity: 'error', 
            summary: 'Hmmm', // title
            detail: "hold on...", 
            life: 2000
          }
        toastRef.current.show(notification);
    }

    const showPopup = () => {
        const notification = {
            severity: 'success', 
            summary: 'Thanks', // title
            detail: "Thanks for your great feedback!", 
            life: 2000
          }
        toastRef.current.show(notification);
    }

    return (
        <div className="contact mt-8 md:mt-4 px-2 ">
            <Toast ref={toastRef} />
            <div className="container my-5 px-2 md:pl-0">
                <h1 className="section-title line-top text-gray-900">Contact</h1>
            </div>
            <div className="grid mb-5">
                <div className="col">
                    <p className="text-xl text-bluegray-700 welcome-text px-2 md:pl-0">
                        Let's build something great together. <br/>
                        Complete contact form one right side or send me email at <br/>
                        <a href="mailto:lwz7512@gmail.com">lwz7512@gmail.com </a>
                    </p>
                    <hr/>
                    <h2 className="px-2 md:pl-0">Office</h2>
                    <p className="text-xl text-bluegray-700 px-2 md:pl-0">
                        40 Larkview Terrace, Halifax, NS. <br/>
                        902-237-7065
                    </p>
                    <div className="mt-5 map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22680.90407339273!2d-63.72530236250141!3d44.71730509098772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b598a2a38dd273b%3A0x15660da555fe5b62!2s40%20Larkview%20Terrace%2C%20Bedford%2C%20NS%20B4B%201G9!5e0!3m2!1sen!2sca!4v1645226783451!5m2!1sen!2sca" 
                            width="600" height="450" 
                            style={{border:0}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            title="office address"
                        />
                    </div>
                </div>
                <div className="col px-3 md:pl-5">
                    <div className="card form-card border-round p-3 md:p-6">
                        <form action="#" id="contactForm" method="POST">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="text" 
                                    placeholder="Your name" 
                                    required
                                    value={contact.name}
                                    onChange={inputChangeHandler('name')}
                                />
                                <span className="animate-border" aria-hidden="true"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="text" 
                                    placeholder="Your Email address" 
                                    required
                                    value={contact.email}
                                    onChange={inputChangeHandler('email')}
                                />
                                <span className="animate-border" aria-hidden="true"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">What type of message you are going to leave?</label>
                                <div className="form-select-wrap">
                                    <select 
                                        id="subject" 
                                        name="subject" 
                                        value={contact.subject}
                                        onChange={inputChangeHandler('subject')}
                                    >
                                        <option value="">Please select</option>
                                        <option value="Suggestion">Suggestion</option>
                                        <option value="Design">Design</option>
                                        <option value="Bug">Bug</option>
                                        <option value="GameIdea">Game Idea</option>
                                        <option value="Contribution">Contribution</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message"
                                    rows="5" 
                                    placeholder="Your message"
                                    value={contact.message}
                                    onChange={inputChangeHandler('message')}
                                ></textarea>
                                <span className="animate-border" aria-hidden="true"></span>
                            </div>
                            <div className="form-group form-checkbox">
                                <input 
                                    id="consent" 
                                    name="consent" 
                                    type="checkbox" 
                                    checked={checked} 
                                    onChange={checkboxChangeHandler}
                                />
                                <label htmlFor="consent">I understand that this form is storing my submitted information so I can be contacted.</label>
                            </div>
                            <div className="form-submit button-group">
                                <Button 
                                    type="button" 
                                    label="Send Message"
                                    disabled={!buttonEnabled}
                                    loading={sending}
                                    onClick={submitContact}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage