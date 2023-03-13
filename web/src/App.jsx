import React, { createContext, useState, useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Signup from "./pages/Signup";
import SignupSecond from "./pages/SignupSecond";

const reducer = (state, action) => {
  let copyState = { ...state };

  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      copyState[action.dataType] = [
        action.newData,
        ...copyState[action.dataType],
      ];
      return copyState;
    }

    case "REMOVE": {
      copyState[action.dataType] = copyState[action.dataType].filter(
        (v) => v !== action.delData
      );

      return copyState;
    }

    default:
      return state;
  }
};

export const dataStateContext = React.createContext();
export const dataDispatchContext = React.createContext();
export const UserContext = createContext();

function App() {
  const [dummyData, dispatch] = useReducer(reducer, {});
  const [user, setUser] = useState({
    userEmail: "",
    userPassword: "",
    userPasswordConfirm: "",
    userPicture: "",
    userNickname: "",
    userCollege: [],
    userSkill: [],
    userJob: [],
    userExperience: [],
    userCareer: [],
    userIntroduction: "",
    userBlog: [],
  });

  const onInit = (initData) => {
    dispatch({ type: "INIT", data: initData });
  };

  const onCreate = (dataType, newData) => {
    dispatch({
      type: "CREATE",
      dataType,
      newData,
    });
  };

  // REMOVE
  const onRemove = (dataType, delData) => {
    dispatch({ type: "REMOVE", dataType, delData });
  };

  return (
    <dataStateContext.Provider value={dummyData}>
      <dataDispatchContext.Provider value={{ onCreate, onRemove, onInit }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              {/*<Route path="/*" element={<Home />} />
              <Route path="/mypage" element={<MyPage />} />*/}
              <Route path="/signup" element={<Signup />} />
              {/*<Route path="/signupsecond" element={<SignupSecond />} />*/}
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </dataDispatchContext.Provider>
    </dataStateContext.Provider>
  );
}

export default App;
