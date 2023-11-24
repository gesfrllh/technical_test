import { useEffect, useState, useRef } from "react";
import IconsSearch from "../Icons/IconsSearch";
import LoadingPage from "../Loading";
import IconsChatPeople from "../Icons/IconsChatPeople";
import axios from "axios";
import IconsLeft from "../Icons/IconsLeft";
import IconsClose from "../Icons/IconsClose";
import IconNavigationMore from "../Icons/IconNavigationMore";

const Message = () => {
  const [load, setLoad] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [edit, setEdit] = useState({});
  const [data, setData] = useState([
    {
      id: 1,
      name: "Anton",
      date: "10/11/2023",
      mess: [
        {
          user: "Anton",
          chat: "Halo",
          timestamp: "12:30",
        },
      ],
    },
    {
      id: 2,
      name: "Muktar",
      date: "10/11/2023",
      mess: [
        {
          user: "Muktar",
          chat: "Iya",
          timestamp: "12:30",
        },
      ],
    },
  ]);
  const messagesEndRef = useRef(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editedMessage, setEditedMessage] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    if (!isNaN(dateObject.getTime())) {
      const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      const day = dateObject.getDate().toString().padStart(2, "0");
      const year = dateObject.getFullYear();

      return `${month}/${day}/${year}`;
    } else {
      return dateString;
    }
  };

  const sendMessage = () => {
    const userMessage = inputMessage.toLowerCase();
    if (edit) {
      setOpenEdit(!openEdit);
      const editedChat = {
        user: "You",
        chat: inputMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const editedIndex = data.findIndex(
        (item) => item.id === editedMessage.id
      );

      const newData = [...data];

      newData[editedIndex] = {
        ...editedMessage,
        mess: [editedChat],
      };

      setData(newData);

      setInputMessage("");
      setEditedMessage(null);
      setEdit(false);
    } else {
      const newChat = {
        user: "You",
        chat: inputMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          name: "You",
          date: formatDate(new Date()),
          mess: [newChat],
        },
      ]);

      setInputMessage("");

      setTimeout(() => {
        let botReply = {
          user: "Muktar",
          chat: "Maaf, saya tidak mengerti.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        if (userMessage.includes("halo")) {
          botReply = {
            user: "Muktar",
            chat: "Halo! Ada yang bisa saya bantu?",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        } else if (userMessage.includes("jam berapa")) {
          botReply = {
            user: "Muktar",
            chat: `Sekarang jam ${new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}.`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }

        setData((prevData) => [
          ...prevData,
          {
            id: prevData.length + 1,
            name: "Muktar",
            date: formatDate(new Date()),
            mess: [botReply],
          },
        ]);
      }, 1000);
    }
  };

  const newOpenChat = (id) => {
    axios
      .get(`https://655bb050ab37729791a97b8e.mockapi.io/message/?id=${id}`)
      .then((res) => {
        const messageNew = res.data[0];
        setNewMessage(messageNew);
        setOpenChat(!openChat);
      });
  };

  const openToEdit = (id) => {
    const messageToEdit = data.find((item) => item.id === id);
    setEdit(messageToEdit);
    setEditingItemId(id); // Set the ID of the item being edited
    setOpenEdit(true);
  };

  const editMessage = (id) => {
    const messageToEdit = data.find((item) => item.id === id);
    setInputMessage(messageToEdit.mess[0].chat);
    setEditedMessage(messageToEdit);
    setEdit(true);
  };

  const deleteMessage = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setOpenEdit(false);
  };

  const BackgroundColorClass = (index, name) => {
    if (name === "You" || name === "Muktar") {
      return name === "You" ? "bg-[#EEDCFF]" : "bg-[#D2F2EA]";
    }
    const colors = ["bg-[#FCEED3] "];
    return colors[index % colors.length];
  };

  const colorName = (index, name) => {
    if (name === "You" || name === "Muktar") {
      return name === "You"
        ? "text-[#9B51E0] text-sm font-[700] text-end"
        : "text-[#43B78D] text-sm font-[700]";
    }
    const colors = ["text-[#E5A443] text-sm font-[700]"];
    return colors[index % colors.length];
  };

  const displayChat = (index, name) => {
    if (name === "You" || name === "Muktar") {
      return name === "You"
        ? "flex items-center w-full flex-row-reverse"
        : "flex items-center w-full justify-start";
    }
    const display = ["flex items-center w-full justify-start"];
    return display[index % display.length];
  };

  const backChat = () => {
    setOpenChat(false);
  };

  useEffect(() => {
    setLoad(true);
    axios
      .get(`https://655bb050ab37729791a97b8e.mockapi.io/message`)
      .then((res) => {
        setMessage(res.data);
        setLoad(false);
      });
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);
  return (
    <>
      <div className=" h-[737px] w-[734px] fixed right-10 bottom-36 bg-white shadow-lg rounded-lg">
        <div>
          {openChat ? (
            <div className="">
              <div className="px-8 py-4 border-b-2 flex justify-between items-center">
                <div className="flex gap-8 items-center">
                  <div className="cursor-pointer" onClick={backChat}>
                    <IconsLeft />
                  </div>
                  <div>
                    <p className="text-lg text-blue-500">{newMessage.title}</p>
                    <p className="text-sm text-gray-500">Participants</p>
                  </div>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setOpenChat(!openChat)}
                >
                  <IconsClose />
                </div>
              </div>
              <div className="flex flex-col overflow-y-scroll h-[590px]">
                <div className="flex flex-col  ">
                  {data.map((item, index) => (
                    <div key={item.id} className="flex flex-col gap-4 h-full">
                      <div className={`${displayChat(index, item.name)} `}>
                        <div className="py-2 px-4 justify-end">
                          <div
                            className={`${colorName(index, item.name)} py-2`}
                          >
                            {item.name}
                          </div>
                          <div
                            className={` ${BackgroundColorClass(
                              index,
                              item.name
                            )} items-end font-normal rounded-lg w-96 px-4 py-2 text-sm`}
                          >
                            {item.mess.map((chat, chatIndex) => (
                              <div key={chatIndex}>
                                <p className="text-msg py-2">{chat.chat}</p>
                                <p className="text-msg text-xs">
                                  {chat.timestamp}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-8 flex flex-col gap-2">
                          <div
                            className="cursor-pointer"
                            onClick={() => openToEdit(item.id)}
                          >
                            <IconNavigationMore />
                          </div>
                          {edit && editingItemId === item.id && (
                            <div className="flex flex-col text-sm border-2 rounded-lg cursor-pointer ">
                              <p
                                className="border-b px-4 py-1 text-blue-500 hover:bg-gray-100"
                                onClick={() => editMessage(item.id)}
                              >
                                Edit
                              </p>
                              <p
                                className=" px-4 py-1 text-red-500  hover:bg-gray-100"
                                onClick={() => deleteMessage(item.id)}
                              >
                                Delete
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="flex items-center gap-2 px-8 py-2">
                <div className="border-2 py-2  w-full rounded-lg border-gray-700">
                  <input
                    type="text"
                    className="w-full px-8 outline-none "
                    placeholder="Type a new message"
                    onChange={(event) => setInputMessage(event.target.value)}
                    value={inputMessage}
                  />
                </div>
                <div
                  className="px-4 border-2 py-2 rounded-lg cursor-pointer bg-blue-500 text-white"
                  onClick={sendMessage}
                >
                  Send
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mx-4 border-2 my-4 py-2 px-8 rounded-lg flex justify-center">
                <input
                  type="text"
                  className="w-full outline-none"
                  placeholder="Search"
                />
                <div>
                  <IconsSearch />
                </div>
              </div>
              {load ? (
                <div className="flex items-center justify-center  h-[550px]">
                  <LoadingPage items={"Chats"} />
                </div>
              ) : (
                <div>
                  {message.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b pb-4 px-4 pt-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => newOpenChat(item.id)}
                    >
                      <div>{<IconsChatPeople />}</div>
                      <div className="flex flex-col">
                        <div className="flex gap-4 items-center ">
                          <p className="text-lg text-blue-500">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(item.date)}
                          </p>
                        </div>
                        <div>
                          <p>{item.name !== "" ? `${item.name} :` : ""}</p>
                          <p className="text-msg">{item.chat}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>{" "}
      </div>
    </>
  );
};

export default Message;
