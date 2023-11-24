import ButtonChat from "../Icons/ButtonChat";
import ButtonEvent from "../Icons/ButtonEvent";
import { useState } from "react";
import ButtonTask from "../Icons/ButtonTask";
import "../../App.css";
import Task from "../Task/Task";
import ButtonOpenTask from "../Icons/ButtonOpenTask";
import Message from "../Messaging/ Message";
import ButtonOpenChat from "../Icons/ButtonOpenChat";

const Event = () => {
  const [click, setClick] = useState(false);
  const [task, setTask] = useState(false);
  const [rotation, setRotation] = useState(false);
  const [eventButton, setEventButton] = useState(false);
  const [message, setMessage] = useState(false);
  const rotateBox = () => {
    setClick((prevClick) => !prevClick);
    setRotation(true);
    setTask(false);
    setEventButton(false);
    setMessage(false);
  };

  const openTask = () => {
    setEventButton((prevEventButton) => !prevEventButton);
    setTask(true);
    setMessage(false);
  };

  const openChat = () => {
    setTask(false);
    setMessage(!message);
  };

  return (
    <>
      {eventButton ? <Task /> : <p></p>}
      {message ? <Message /> : <p></p>}
      <div className="cursor-pointer fixed bottom-8  right-5 flex gap-2  flex-row-reverse items-center justify-center">
        <div className="pt-5" onClick={rotateBox}>
          {task ? (
            <ButtonOpenTask />
          ) : <ButtonEvent /> && message ? (
            <ButtonOpenChat />
          ) : (
            <ButtonEvent />
          )}
        </div>
        {click ? (
          <div className="flex gap-2">
            <div className={`${rotation ? "rotate" : ""}`} onClick={openTask}>
              {task ? <div></div> : <ButtonTask />}
            </div>
            <div onClick={openChat}>
              {message ? <div></div> : <ButtonChat />}
            </div>
          </div>
        ) : (
          <div className="fixed bottom-8 right-5">
            <p></p>
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
