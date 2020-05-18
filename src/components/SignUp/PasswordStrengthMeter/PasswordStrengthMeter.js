import React, { Component } from 'react';
import './PasswordStrengthMeter.css';
import $ from 'jquery';

export class PasswordStrengthMeter extends Component {
        state = {
                progressClass: "strength0",
                passwordDescription: "",
                rules: [{
                        text: "At least 8 letters",
                        classname: "invalid",
                        correctFormat: /.{8}/
                },
                {
                        text: "At least one number",
                        classname: "invalid",
                        correctFormat: /\d/
                },
                {
                        text: "At least one lowercase & one uppercase letter",
                        classname: "invalid",
                        correctFormat: /([A-Z]+.*[a-z]+|[a-z]+.*[A-Z]+)/
                },
                {
                        text: "At least one special character",
                        classname: "invalid",
                        correctFormat: /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/
                }
                ]
        };

        checkRulesValidity(nextProps, arr, regex, index) {
                if (nextProps.pass.match(regex)) {
                        arr[index].classname = "valid";
                        return true;
                }
                return false;
        };

        passwordStrength(nextProps) {
                const strength = ['Too short', 'Weak', 'Good', 'Strong', 'Best'];
                let progress = 0;
                const rules = [];
                this.state.rules.forEach((item) => {
                        rules.push({ ...item });
                });
                const prop = (strength.length - 1) / rules.length;
                rules.forEach((item, index, arr) => {
                        item.classname = "invalid";
                        if (this.checkRulesValidity(nextProps, arr, item.correctFormat, index))
                                progress += prop;
                });
                const newState = {
                        rules: rules,
                        passwordDescription: "Password not entered"
                };
                if (nextProps.pass.length > 0) {
                        const strengthNr = Math.round(progress);
                        newState.passwordDescription = strength[strengthNr];
                        newState.progressClass = 'strength' + strengthNr;
                }
                this.setState(newState);
        };

        componentWillReceiveProps(nextProps) {
                if (nextProps.opened) {
                        $(".pwd_strength_wrap").fadeIn(400);
                } else {
                        $(".pwd_strength_wrap").fadeOut(400);
                }
                if (nextProps.pass) {
                        this.passwordStrength(nextProps);
                }
        }

        render() {
                return (
                        <div className="wrapper">
                                <div className="pwd_strength_wrap">
                                        <div className="passwordDescription"> {this.state.passwordDescription} </div>
                                        <div className={'passwordStrength ' + this.state.progressClass}></div>
                                        <div className="pswd_info">
                                                <p> <strong>Strong Password Tips:</strong> </p>
                                                <ul>
                                                        {this.state.rules.map((item, index) => (
                                                                <li key={index} className={item.classname}> &#9679; {item.text}  </li>
                                                        ))}
                                                </ul>
                                        </div>
                                </div>
                        </div>
                );
        }
}

export default PasswordStrengthMeter;