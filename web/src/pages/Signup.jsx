import { useState } from "react";
import Button from "../components/Button";
import Formbox from "../components/Formbox";
import axios from "axios";
import { useCallback } from "react";

const Signup = () => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");

  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");

  // 유효성 검사 함수
  const validateEmail = (email) => {
    return email
      .toString()
      .toLowerCase()
      .match(/([\w-.]+)@(([\w-]+\.)+)([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  };

  const validatePwd = (password) => {
    return password
      .toString()
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
  };

  const validateNickname = (nickname) => {
    return nickname
      .toString()
      .toLowerCase()
      .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/);
  };

  const [validSignup, setValidSignup] = useState(false);

  const isValid = useCallback(() => {
    if (
      validateEmail(email) &&
      validatePwd(password) &&
      password === confirmPwd &&
      validateNickname(nickname)
    ) {
      setValidSignup(true);
    } else setValidSignup(false);
  }, [email, password, confirmPwd, nickname]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (validateEmail(email)) {
      setEmailMsg("");
    } else {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
    }
  };

  const onChangePwd = (e) => {
    setPassword(e.target.value);
    if (validatePwd(password)) {
      setPwdMsg("");
    } else {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.");
    }
  };

  const onChangeConfirmPwd = (e) => {
    setConfirmPwd(e.target.value);

    if (password === confirmPwd) {
      setConfirmPwdMsg("");
    } else {
      setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
    }
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    if (validateNickname(nickname)) {
      setNicknameMsg("");
    } else {
      setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.");
    }
  };

  // 이메일 & 닉네임 중복 여부
  const [checkMail, setCheckMail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);

  // 이메일 중복 체크
  const onCheckEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("", { email });
      const { result } = res.data;
      if (!result) {
        setEmailMsg("이미 등록된 메일입니다. 다시 입력해주세요.");
        setCheckMail(false);
      } else {
        setEmailMsg("사용 가능한 메일입니다.😊");
        setCheckMail(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 닉네임 중복 체크
  const onCheckNickname = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("", { nickname });
      const { result } = res.data;

      if (!result) {
        setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
        setCheckNickname(false);
      } else {
        setNicknameMsg("사용 가능한 닉네임입니다.😊");
        setCheckNickname(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div>
          <Formbox
            htmlFor={"email"}
            name={"이메일"}
            type={"email"}
            onChange={onChangeEmail}
            message={emailMsg}
            msgLen={emailMsg.length}
            placeholder={"123456@example.com"}
          />
          <Button
            type={"button"}
            onClick={onCheckEmail}
            text={"이메일 확인"}
            className={"button"}
          />
        </div>
        <Formbox
          htmlFor={"password"}
          name={"비밀번호"}
          type={"password"}
          onChange={onChangePwd}
          message={pwdMsg}
          msgLen={pwdMsg.length}
        />
        <Formbox
          htmlFor={"confirmPwd"}
          name={"비밀번호 확인"}
          type={"password"}
          onChange={onChangeConfirmPwd}
          message={confirmPwdMsg}
          msgLen={confirmPwdMsg.length}
        />
        <div>
          <Formbox
            htmlFor={"nickname"}
            name={"닉네임"}
            type={"text"}
            onChange={onChangeNickname}
            message={nicknameMsg}
            msgLen={nicknameMsg.length}
          />
          <Button
            type={"button"}
            onClick={onCheckNickname}
            text={"닉네임 확인"}
            className={"button"}
          />
        </div>
        <Button
          type={"submit"}
          disabled={!validSignup}
          text={"회원가입"}
          className={"submit"}
        />
      </form>
    </div>
  );
};

export default Signup;
