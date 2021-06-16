import './ProjectD.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
import refreshToken from '../../functions/refreshToken';
import axios from 'axios';
import CirclesLoader from '../Loader/CirclesLoader';

/* 
    HOME

    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class ProjectD extends React.Component {

    constructor() {
     
        super();
        this.state = {
            Ldata: '',
            tlead: '',
            dline: '',
        }
    }

    componentDidMount(){


        refreshToken();

        const obj1 = JSON.parse(localStorage.getItem('pdata'));

        this.setState({
            pname : obj1.projectName,
            tlead: obj1.teamlead,
            dline: obj1.deadline
        });      
        
        this.getMeetingLinks();
    }

    getMeetingLinks = () => {

        const token1 = localStorage.getItem('token');
        const obj = JSON.parse(localStorage.getItem('pdata'));

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://meet-zode.herokuapp.com/api/meet/' + obj.projectID;

        axios.get(url, config)
        .then((res) => {
    
            if(res.status === 200) {

                //alert(JSON.stringify(res.data));
                this.setState({
                    Ldata : res.data,
                }); 
                
            } else {

            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            }
        });
    }

    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    render() {

        return (
            <div className="ProjectD">
                
                <div className="pd-top-nav">

                    <div className="pd-left-wrapper">
                        <div className="pd-lt" onClick={ this.backToBaseFn }>
                            <div className="pd-arrow"></div>
                            <div><p className="pd-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="pd-lb"><p className="pd-title">zode</p></div>
                    </div>
    
                    <div className="pd-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="pd-right-wrapper">
                        <input type="submit" value="Logout" className="pd-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="pd-body-wrapper">

                    <div className="pd-left-nav">
                        
                        <div className="pd-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng1-wrapper">
                                    <div className="pd-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/home" style={{ textDecoration: 'none' }}>
                                <div className="pd-chat" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng4" data-tip data-for="calTip">
                                </div>
                            </Link> 
                            <div className="pd-lng5" data-tip data-for="noneTip"></div>
                            <div className="pd-lng6" data-tip data-for="noneTip"></div>
                            <div className="pd-lng7" data-tip data-for="noneTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                            <ReactTooltip id="noneTip" place="right" effect="float" type="dark">None</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="pd-body">
                        
                        <div className="pdb-hdn-wrapper">

                            <div className="pdb-hdn-left">
                                <div className="pdb-hl-1"><p>Project Name:&nbsp;&nbsp;{ this.state.pname }</p></div>
                                <div className="pdb-hl-2"><p>Team Lead:&nbsp;&nbsp;<span className="wrx">{ this.state.tlead }</span></p></div>
                            </div>

                            <div className="pdb-hdn-right">
                                <div className="pdb-hr-1"><p>Due By:&nbsp;&nbsp;{ this.state.dline }</p></div>
                            </div>
                        </div>

                        <div className="pdb-proLine"></div>

                        <div className="pdb-meetings">

                            <div className="pdb-m-left">
                                
                                <div className="">
                
                                    <p className="pdml-hdn">Scheduled Meetings</p>

                                    <div className="pdml-link-wrx">

                                        { !this.state.Ldata ? (
                                        
                                            <div className="PD-loading">
                                                <CirclesLoader />
                                            </div>                                    

                                        ):( this.state.Ldata.map((ldat, i) => (
                                            <p></p>
                                        )))}

                                        <div className="pdml-sch-meeting">
                                            
                                            <div className="pdml-sch-grid-block1 cmx">
                                                <p>Test Meeting</p>
                                            </div>

                                            <div className="pdml-sch-grid-block2 cmx">
                                                <p>John Doe</p>
                                            </div>

                                            <div className="pdml-sch-grid-block3 cmx">
                                                <p>30-June-2021</p>
                                            </div>

                                            <div className="pdml-sch-grid-block4 cmx">
                                                <p>10: 20 AM</p>
                                            </div>

                                            <div className="pdml-sch-grid-block5 cmx">
                                                <p>Join</p>
                                            </div>
                                        </div>
                                    
                                        <div className="pdml-sch-meeting">
                                            
                                            <div className="pdml-sch-grid-block1 cmx">
                                                <p>Test Meeting</p>
                                            </div>

                                            <div className="pdml-sch-grid-block2 cmx">
                                                <p>John Doe</p>
                                            </div>

                                            <div className="pdml-sch-grid-block3 cmx">
                                                <p>30-June-2021</p>
                                            </div>

                                            <div className="pdml-sch-grid-block4 cmx">
                                                <p>10: 20 AM</p>
                                            </div>

                                            <div className="pdml-sch-grid-block5 cmx">
                                                <p>Join</p>
                                            </div>
                                        </div>

                                        <div className="pdml-sch-meeting">
                                            
                                            <div className="pdml-sch-grid-block1 cmx">
                                                <p>Test Meeting</p>
                                            </div>

                                            <div className="pdml-sch-grid-block2 cmx">
                                                <p>John Doe</p>
                                            </div>

                                            <div className="pdml-sch-grid-block3 cmx">
                                                <p>30-June-2021</p>
                                            </div>

                                            <div className="pdml-sch-grid-block4 cmx">
                                                <p>10: 20 AM</p>
                                            </div>

                                            <div className="pdml-sch-grid-block5 cmx">
                                                <p>Join</p>
                                            </div>
                                        </div>                                        

                                    </div>
                                </div>
                            </div>
                            
                            <div className="pdb-m-right">
                                
                                <div className="pdb-members-online-wrx">
                                    
                                    <div className="pdb-online-one">
                                        <p>Members Online</p>
                                    </div>
                                    
                                    <div className="pdb-online-two"></div>                                
                                </div> 

                                <div className="pdb-online-proLine"></div> 
                                
                                <div className="pdb-online-users">
                                    <p>Test User 1</p>
                                    <p>Test User 2</p>
                                    <p>Test User 3</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}