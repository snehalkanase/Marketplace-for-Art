import React from 'react'
import "./updateprof.css"

export default function UpdateProfile() {
  return (
    <>
     <div className="container">
            <div className="updateProfile">
                <h3 className="Logo">Artovox</h3>
                <span className="loginDes">
                    Connect and fall in love with Art on Artovox.
                </span>
                <form>
                    <div className="profileBox">
                        <input type="text" name="desc" placeholder="Description" className="input"/> 
                        <input type="file" name="profilePicture" placeholder="profilePicture" className="input"/>
                        <input type="file" name="coverPicture" placeholder="coverPicture" className="input"/>
                        <button className="submit">Submit</button>
                        
                    </div>

                </form>
                
            </div>

        </div>
    </>
  )
}
