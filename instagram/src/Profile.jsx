import React, { useEffect,useState} from 'react'
import axios from 'axios'

function Profile() {

  const [profile,setProfile] =useState(null);
  const [followers,setFollowers] =useState([]);
  const [unfollow,setUnfollow] =useState(0);


  useEffect(()=>{
    axios.get('http://localhost:3000/profile')
    .then((data1)=>{setProfile(data1.data)})
    .catch((err)=> console.log(err))

     axios.get('http://localhost:3000/followers')
    .then((data1)=>{setFollowers(data1.data)})
    .catch((err)=> console.log(err))

  },[unfollow]);

  function HandleOnChange(e) {
    setProfile(prev=>({
      ...prev,[e.target.name]:e.target.value
    }))
  }

  const handleUpdate = async =>{
    axios.put('http://localhost:3000/profile',profile)
    .then(console.log("UPDATED"))
    .catch((err)=> console.log(err))
  }

  const handleUnFollow = async (id,username)=> {
    axios.delete(`http://localhost:3000/followers/${id}`)
    .then(alert(`UN FOLLOWED ${username} `))
    .then(setUnfollow(!unfollow))
    .catch((err)=>console.log(err))
  }

  return (
    <div className='m-5'>
      {profile ? (
      <div>
      <img src={profile.profile_pic} className='profile rounded-circle' />
      <h5>{profile.username}</h5>

      <input type="text" name='username' value={profile.username} className='form-control my-5'  onChange={HandleOnChange} />
      <input type="text" name='profile-pic' value={profile.profile_pic} className='form-control my-5' onChange={HandleOnChange} />

      <button className='btn btn-primary my-3 ' onClick={handleUpdate}>update  
      </button>


      </div>
      ):(
      <div>
      LOADING PROFILE
      </div>
    )}    

    {followers.length > 0 ? (
      followers.map((follower)=>(
        <div key={follower.id} className='d-flex my-2'>
          {follower.username}
          <button className='btn btn-secondary ms-auto' onClick={()=>{handleUnFollow(follower.id,follower.username)}} >un follow</button>
        </div>
      ))

    ):(
          <div> LOADING FOLLOWERS</div>
    )}


    </div>
  )
}

export default Profile