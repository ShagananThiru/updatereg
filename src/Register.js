import React, {Component} from 'react';
import './App.css';
import t from 'tcomb-form'

import './Register.css'

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md#styling
const Form = t.form.Form;


var Gender = t.enums({
    
    1: 'Male',
    2: 'Female'
  });

  var Exten = t.enums({   
    65: '+65',
    94: '+94',
    91: '+91',
    17: '+12'
  });


const User = t.struct({
  FirstName: t.String,
  LastName: t.String, //t.maybe(t.String),
  GenderU: Gender,
  email: t.String,
  Address: t.String,
  PostCode: t.String,
  Country: t.String,
  Extention:Exten,
  MobilePhone: t.String,
  Occupation: t.String,
  Field: t.String,
  OrganizationName: t.String,
 
  terms: t.Boolean
  
});



const Options = {
  
  fields: {
    email: {
      // error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    password: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    },
    terms: {
      label: 'Email double checked',
      attrs: {
        className: 'formlabel'
      }
    },
    FirstName:{
      placeholder : 'First Name',
    },
    LastName:{
      placeholder : 'Last Name',
    },
    GenderU:{
        label: 'Gender ',
        className:'formlabel',
    },
    Extention:{
      label: 'Ext ',
    }
  },
  
    auto: 'placeholders',
    
  
};

class Time extends Component {
    constructor(){
        super()
        this.state={
            email_flag:null,
            serverUpdate_flag: null,
            userData:null,
        }
    }
    

    async handleSubmit(){
        const values = JSON.stringify(this._form.getValue())
       
        if(values !== 'null'){
          console.log(values)
          this.setState({userData:10})
          await fetch(`/data?agr1=${values}`)
          .then(res => res.json())          // convert to plain text
          .then(data => this.setState({email_flag:data.status})) 


          // .then(response => response.json())
          // .then(data =>{this.setState({email_flag:data.status});
          // });
        }
    
        
    }

    handleServerupdate(){
      
    }
    render(){
        return(
            <div>
              <div className='viewBtn' ><img alt='logo' src='asserts/logo.jpg' className='logoImg'/></div>
              <div className='viewtxt'>Let's fight for</div>
              <div className='viewtxt'>Virus free Earth, Together.. </div>
              { this.state.userData
                ? <>
                    {this.state.email_flag
                      ?<>
                          {this.state.email_flag==='1'
                            ?<>
                              <div  className='viewtxt'  style={{color:'#49FB0A', marginTop:'10px'}}>Pls check your Email </div>
                              <div  className='viewtxt'  style={{color:'#49FB0A', marginTop:'-10px'}}>for AiThena QR code</div>
                             </>
                            :<>
                              <div  className='viewtxt'  style={{color:'#FB0A0A', marginTop:'10px', fontSize:'15px'}}>Your Email is invalid</div>
                              <div  className='viewtxt'  style={{color:'#FBC60A', marginTop:'-10px'}}>Pls try again</div>
                             </>

                          }
                      </>

                    :<>
                      <div  className='viewtxt'  style={{color:'#FBC60A', marginTop:'10px'}}>Please wait for a while</div>
                      <div className='lo adView'><img alt='loading' className='loading' src='asserts/giphy.gif' /></div>
                     </>
                    } 
                  </>
                :
                  <>   
                    <form className='formlab el'><Form  type={User} ref={c => this._form = c} options={Options} />  </form>
                    <div className='viewBtn'>
                      <div style={{fontSize:'11px'}}>We send the QR code to your email </div>
                    <button  onClick={()=>this.handleSubmit()} className="sumitBtn">Submit</button>
                    </div>
                    
                  </>
              }
                
            </div>
        )
    }
}
    

export default Time;