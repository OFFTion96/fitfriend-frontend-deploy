import React, { useState, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import "./EditPost.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export const EditPost = () => {
  const [activityData, setActivityData] = useState([]);
  const activityId = "63034cb344b74d1fde325dc5";
  useEffect(() => {
    console.log("hello");
    const url = `http://localhost:9000/activities/${activityId}`;
    console.log(url);
    axios.get(`${url}`).then((res) => {
      console.log(res.data);
      setActivityData(res.data);
    });
    console.log(activityData);

  }, []);

  const options = [
    {id:'a', value: '', text: 'Name of Sport', disabled: true},
        {id:'b', value: 'running', text: 'Running'},
        {id:'c', value: 'jogging', text: 'Jogging'},
        {id:'d', value: 'yoga', text: 'Yoga'},
        {id:'e', value: 'aerobic', text: 'Aerobic'},
        {id:'f', value: 'strength Training', text: 'Strength Training'},
        {id:'g', value: 'swimming', text: 'Swimming'},
        {id:'j', value: 'other', text: 'Other'},
  ];

  const [form, setForm] = useState({
    selected: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    caption: "",
  });

  const [images, setImages] = useState({
    sport_photo: "",
  });
  

  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImages({ ...images, sport_photo: base64 });
  };

  const onChange = (e) => {
    setActivityData({ ...activityData, [e.target.name]: e.target.value });
  };

  const connectToBackend = async () => {
    const date = dateFormat(activityData.date, "isoDateTime");
    const timeStart = dateFormat(activityData.timeStart, "isoDateTime");
    const timeEnd = dateFormat(activityData.timeEnd, "isoDateTime");
    if (activityData.selected === "other") {
      activityData.selected = activityData.addSport;
    }
    const headers = {
      "Content-Type": "application/json",
    };

    const addActivity = {
      username: "jib",
      username_id: "999",
      sport: activityData.selected,
      date: date,
      time_start: timeStart,
      time_end: timeEnd,
      location: activityData.location,
      captions: activityData.captions,
      sport_photo: images.sport_photo,
    };
    console.log(addActivity);
    await axios
      .put(`http://localhost:9000/activities/edit/${activityId}`, addActivity, { headers: headers })
      .then((res) => {
        console.log(res);
      });
  };

  const onSubmits = async (e) => {
    e.preventDefault();
    console.log(form);
    // console.log(images);
    await connectToBackend();
  };

  return (
    <div className="PostForm">
      <h1>Edit Post</h1>
      <form onSubmit={onSubmits}>
        <div className="content">
          <label>Sport</label>
          <select
            required
            value={activityData.selected}
            name="selected"
            onChange={onChange}
          >
            {options.map((option) => (
              <option
                disabled={option.disabled}
                key={option.id}
                value={option.value}
              >
                {option.text}
              {/* {activityData.sport == option.text} */}
              </option>
            ))}
          </select>
          {activityData.selected === "other" && (
            <input
              name="addSport"
              className="addSport"
              onChange={onChange}
              value={activityData.addSport}
              placeholder="Add Sport..."
            />
          )}
        </div>

        <div className="content">
          <label>Location</label>
          <input
            type="text"
            className="locationInput"
            name="location"
            placeholder="Share your location"
            value={activityData.location}
            onChange={onChange}
            required
          />
        </div>

        <div className="content">
          <label>Caption</label>
          <textarea
            type="text"
            name="captions"
            placeholder="What is your activity today?"
            value={activityData.captions}
            onChange={onChange}
            required
            maxLength="200"
            rows="5"
            cols="50"
          />
        </div>

        <div className="content">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="dateInput"
            value={activityData.date}
            onChange={onChange}
            required
          />
        </div>

        <div className="content">
          <label>Time-start</label>
          <input
            className="inputTime"
            type="datetime-local"
            name="timeStart"
            value={activityData.timeStart}
            onChange={onChange}
          />
        </div>
        <div className="content">
          <label>Time-End</label>
          <input
            className="inputTime"
            type="datetime-local"
            name="timeEnd"
            value={activityData.timeEnd}
            onChange={onChange}
          />
        </div>

        <div className="content">
          <label>Photo</label>
          <input
            type="file"
            className="inputPhoto"
            name="sport_photo"
            multiple accept="sport_photo/*"
            onChange={(e) => handleFileUpload(e)}
            id="upload"
            hidden
          />
           
            <label
              htmlFor="upload"
              className="chooseFile"
              value={activityData.sport_photo}
            > 
              <img width="100" height="100" src={images.sport_photo == "" ? activityData.sport_photo : images.sport_photo  } />
              {/* <img width="100" height="100" src={images.sport_photo} /> */}
            </label>
          
        </div>

        <div className="buttonPost">
          <button className="saveButton" type="submit">
            SAVE
          </button>
          <button className="cancelButton" type="submit">
            <Link to="/MainPage">CANCEL</Link>
          </button>
          {/* <Link to='/MainPage'><button className="cancelButton" type="submit" >CANCEL</button></Link> */}
        </div>
      </form>
    </div>
  );
};
