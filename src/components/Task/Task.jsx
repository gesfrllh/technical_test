import Select from "react-select";
import IconUp from "../Icons/IconUp";
import IconNavigationMore from "../Icons/IconNavigationMore";
import IconEdit from "../Icons/IconEdit";
import IconTimer from "../Icons/IconTimer";
import IconCalendar from "../Icons/IconCalendar";
import IconDown from "../Icons/IconDown";
import DatePicker from "sassy-datepicker";
import "../../../node_modules/sassy-datepicker/dist/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import IconEditNew from "../Icons/IconEditNew";
import IconTimerNew from "../Icons/IconTimerNew";
import LoadingPage from "../Loading";

const Task = () => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [close, setClose] = useState(true);
  const [closeData, setCloseData] = useState({});
  const [ceklis, setCeklis] = useState(false);
  const [checkData, setCheckData] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    title: "",
    dates: new Date(),
    description: "",
  });
  const [buttonDelete, setButtonDelete] = useState(false);
  const [buttonDeleteData, setButtonDeleteData] = useState({});
  const [newData, setNewData] = useState(false);
  const [load, setLoad] = useState(false);

  const datePick = (newDate) => {
    setDate(newDate);
    setOpenDate(false);
  };

  const deleteData = (dataId) => {
    console.log(dataId);
    axios
      .delete(`https://655bb050ab37729791a97b8e.mockapi.io/users/${dataId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== dataId));
        setButtonDelete(!buttonDelete);
        console.log("success");
      });
  };

  const options = [
    { value: "myTask", label: "My Task" },
    { value: "personalErrands", label: "Personal Errands" },
    { value: "urgentToDo", label: "Urgant To-Do" },
  ];

  const save = () => {
    const format = formatDate(date);
    const data = {
      title: user.title,
      dates: format,
      description: user.description,
    };

    axios
      .post(`https://655bb050ab37729791a97b8e.mockapi.io/users`, data)
      .then((res) => {
        setUsers((prevUsers) => [...prevUsers, res.data]);
        setUser({
          title: "",
          dates: new Date(),
          description: "",
        });
        setNewData(false);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    if (!isNaN(dateObject.getTime())) {
      const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      const day = dateObject.getDate().toString().padStart(2, "0");
      const year = dateObject.getFullYear();

      return `${month}/${day}/${year}`;
    } else {
      return dateString; // Return original string if parsing fails
    }
  };

  const openToDate = () => {
    setOpenDate(true);
  };

  const checklist = () => {
    setCeklis(!ceklis);
  };
  const handleDescriptionChange = (event) => {
    setUser({
      ...user,
      description: event.target.value,
    });
  };
  const handleTitleChange = (event) => {
    setUser({
      ...user,
      title: event.target.value,
    });
  };

  useEffect(() => {
    setLoad(true);
    axios
      .get(`https://655bb050ab37729791a97b8e.mockapi.io/users`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUsers(res.data);
          setLoad(false);
        } else {
          console.error("Invalid data format:", res.data);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="border-2 h-[737px] w-[734px] fixed right-10 bottom-36 bg-white shadow-lg rounded-lg">
      <div className="flex px-8 py-4 justify-between items-center">
        <div className="px-14 ">
          <Select options={options} />
        </div>
        <div
          className="border px-4 py-2 rounded-lg bg-blue-400 text-white cursor-pointer"
          onClick={() => setNewData(!newData)}
        >
          New Task
        </div>
      </div>
      {load ? (
        <LoadingPage items={'Task'}/>
      ) : (
        <div className="py-4  h-[600px] flex flex-col gap-4 overflow-y-auto overflow-x-hidden mx-4 px-4">
          {users.map((item) => (
            <div className="border-b py-4 border-gray-500" key={item.id}>
              <div className="py-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onClick={() =>
                        setCheckData((prevCheck) => ({
                          ...prevCheck,
                          [item.id]: !prevCheck[item.id],
                        }))
                      }
                    />
                    <div
                      className={
                        checkData[item.id]
                          ? "line-through text-[16px] text-gray-500"
                          : "text-[16px] font-medium"
                      }
                    >
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-md text-red-500">
                      <p>{formatDate(item.dateOff)}</p>
                    </div>
                    <div className="text-md text-gray-700">
                      <p>{formatDate(item.dates)}</p>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setCloseData((prevClose) => ({
                          ...prevClose,
                          [item.id]: !prevClose[item.id],
                        }))
                      }
                    >
                      {closeData[item.id] ? <IconUp /> : <IconDown />}
                    </div>
                    <div
                      onClick={() =>
                        setButtonDeleteData((prevButton) => ({
                          ...prevButton,
                          [item.id]: !prevButton[item.id],
                        }))
                      }
                      className="cursor-pointer"
                    >
                      <IconNavigationMore />
                    </div>
                  </div>
                </div>
                {buttonDeleteData[item.id] ? (
                  <div
                    className="flex justify-end"
                    onClick={() => deleteData(item.id)}
                  >
                    <div className="rounded-lg shadow-md cursor-pointer border px-8 py-1">
                      <p className="text-red-500">Delete</p>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              {closeData[item.id] ? (
                <div className="px-10 flex flex-col gap-8">
                  <div className="flex gap-4 items-center">
                    <IconTimer />
                    <div className="flex h-14 gap-4">
                      <div className="border-2  border-gray-500 flex items-center rounded-lg px-4">
                        <input
                          type="text"
                          value={formatDate(date)}
                          className="border-2  py-2  outline-none border-none"
                          onClick={openToDate}
                        />
                        <IconCalendar />
                      </div>
                      {openDate ? (
                        <div className="absolute right-24 z-10">
                          <DatePicker
                            onChange={datePick}
                            value={new Date(date)}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <IconEdit />
                    {item === [] ? (
                      <div className="relative">
                        <textarea
                          name=""
                          id=""
                          cols="60"
                          value={user.description}
                          onChange={handleDescriptionChange}
                          rows="4"
                          className="px-4 py-2 outline-none border-2 border-gray-500 rounded-lg"
                        ></textarea>
                      </div>
                    ) : (
                      <div>{item.description}</div>
                    )}
                  </div>
                  <div className="px-8">
                    {item === [] ? (
                      <div
                        className="border-2 w-32 flex items-center justify-center py-2 bg-blue-400 text-white rounded-lg cursor-pointer"
                        onClick={save}
                      >
                        Save
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
          {newData ? (
            <div className="border-b py-4 border-gray-500">
              <div className="py-4">
                <div className="flex gap-4 justify-between w-full items-center">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" onClick={checklist} />
                    <div>
                      <input
                        type="text"
                        placeholder="Type Tesk Title"
                        value={user.title}
                        onChange={handleTitleChange}
                        className="border-2 border-gray-500 rounded-lg w-96 py-2 outline-none px-4"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="cursor-pointer"
                      onClick={() => setClose(!close)}
                    >
                      {close ? <IconUp /> : <IconDown />}
                    </div>
                    <div onClick={deleteData}>
                      <IconNavigationMore />
                    </div>
                  </div>
                </div>
                {buttonDelete ? (
                  <div className="flex justify-end ">
                    <div className="rounded-lg shadow-md cursor-pointer border px-8 py-1">
                      <p className="text-red-500">Delete</p>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              {close ? (
                <div className="px-10 flex flex-col gap-8">
                  <div className="flex gap-4 items-center">
                    <IconTimerNew />
                    <div className="flex h-14 gap-4">
                      <div className="border-2  border-gray-500 flex items-center rounded-lg px-4">
                        <input
                          type="text"
                          value={formatDate(date)}
                          className="border-2  py-2  outline-none border-none"
                          onClick={openToDate}
                          placeholder="Set Date"
                        />
                        <IconCalendar />
                      </div>
                      {openDate ? (
                        <div className="absolute right-24 z-10 bottom-24">
                          <DatePicker onChange={datePick} value={user.dates} />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <IconEditNew />
                    <div className="relative">
                      <textarea
                        name=""
                        id=""
                        cols="60"
                        value={user.description}
                        placeholder="No description"
                        onChange={handleDescriptionChange}
                        rows="4"
                        className="px-4 py-2 outline-none rounded-lg"
                      ></textarea>
                    </div>
                  </div>
                  <div className="px-8">
                    <div
                      className="border-2 w-32 flex items-center justify-center py-2 bg-blue-400 text-white rounded-lg cursor-pointer"
                      onClick={save}
                    >
                      Save
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
