import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import {MdPerson} from 'react-icons/md';
import { getAccount } from '../Klaytn/util';
import '../styles/Mypage.css';

function Profile({userInfo, account}) {
    const [name, setName] = useState(userInfo.name);
    const [about, setAbout] = useState(userInfo.about);
    const [file, setFile] = useState(userInfo.profileImg);
    const [isConnected, setIsConnected] = useState(false);
    const [isRegestered, setIsRegesterd] = useState(false); //db에 등록된유저인지
    const imgUploader = useRef(null);
  
    const changeName = (e) => {
          setName(e.target.value)
      }
      const changeAbout = (e) => {
          setAbout(e.target.value);
      }
      const uploadHandler = () => {
          imgUploader.current.click();
      }
      const changeImg = (e) => {
          setFile(e.target.files[0])
      }
  
      const checkLogined = async() => {
          if(isConnected === false) {
               await getAccount();
               setIsConnected(true);
          } 
           await axios.get(`http://localhost:4000/user/${account}`)
           .then((res) => {
               setName(res.data.name);
               setAbout(res.data.about);
               setFile(res.data.prfileimg);
               setIsRegesterd(true);
           }).catch(err => console.log("등록안됨"));
          
      }
  
    const onSubmit = async () => {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('about', about);
          formData.append('profileImg', file);
          
         

          let apiurl;
          if(isRegestered) {
              apiurl = "update";
  
          } else {
              apiurl = "create"
          }
          console.log(apiurl);
          await axios.post(`http://localhost:4000/${apiurl}/${account}`, formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then(()=> {
        console.log("ok");
        setIsRegesterd(true);
          }).catch((err) => {
              console.log(err);
          })
      }
  
    useEffect(async()=> {
      checkLogined();
    },[]);
  
    return(
      <div className='MyPage'>
              <div className="Mypage-wrap">
                  <div className="Mypage-profileImg" onClick={uploadHandler}>
                      {file ? 
                          <img
                          src={URL.createObjectURL(file)} /> :
                          <MdPerson className="Mypage-profileImg-icon"/>
                      }
                          <input type='file' 
                              style={{display:'none'}}
                              accept='image/jpg,impge/png,image/jpeg' 
                              name='profile_img'
                              onChange={changeImg}
                              ref={imgUploader} 
                              className="Mypage-profileImg-input"/>
                  </div>
              </div>
              <div className="Mypage-profileInfo">
                  <div className="Mypage-profileInfo-wrap ">
                      <div className="Mypage-profileInfo-box ">
                          <input onChange={changeName} value={name} type="text" maxLength="12" name="floating_email" className="Mypage-profileInfo-email " placeholder="NickName" required="" />
                          <textarea onChange={changeAbout} value={about} className="Mypage-profileInfo-bio" placeholder='indroduce yourself'> </textarea>
                      </div>
                      <button onClick={onSubmit} className="Mypage-button">Edit</button>
                  </div>
              </div>
              <div>
              </div>
          </div>
      );
    
}
export default Profile;