import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import FormUser from "../FormUser/FormUser";
import DataForm from "../FormUser/DataForm/DataForm";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../../../../hook/use-axios";
import { updateUserInformation } from "../../../../config/url";
import { NotifyActions } from "../../../store/NotifyAfterLogin/NotifyAfterLogin";
const FormUploadUser = () => {
  const user = useSelector((state) => state.user.user?.user);
  const token = useSelector((state) => state.isAuth.token);
  const dispatch = useDispatch();
  const { isLoading, error, data, fetchDataFromServer } = useAxios();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  useEffect(() => {
    if (user) {
      setCountry(user?.basic_information.country);
      setCity({
        city: user?.basic_information.city,
        code: user?.basic_information.city_code,
      });
      setAvatar(user?.avatar);
    }
  }, [user]);

  const updateUserHandler = (event) => {
    if (!user) {
      return;
    }
    event.preventDefault();
    fetchDataFromServer({
      url: updateUserInformation,
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: {
        avatar: avatar,
        name: nameRef.current.value,
        phone_number: phoneRef.current.value,
        country: country?.country || undefined,
        address: addressRef.current.value,
        email: user.email,
        city: city?.city || undefined,
        flag: country?.flag || undefined,
        city_code: city?.code || undefined,
      },
    });
  };
  useEffect(() => {
    if (!isLoading && error) {
      dispatch(
        NotifyActions.showedNotify({
          message: "Cannot change profile, try again",
          code: error.code || 500,
        })
      );
    }
    if(!isLoading && data && !error){
      dispatch(NotifyActions.showedNotify({
        message: 'Changed profile successfully',
        code: 200
      }))
    }
  }, [error, isLoading, dispatch, data]);
  return (
    <form onSubmit={updateUserHandler}>
      <Row>
        <Col xs={12} sm={12} md={5} lg={5}>
          <FormUser user={user} setAvatar={setAvatar} avatar={avatar} isLoadingState={isLoading} />
        </Col>
        <Col xs={12} sm={12} md={7} lg={7}>
          <DataForm
            forwardAllRef={{
              nameRef: nameRef,
              phoneRef: phoneRef,
              addressRef: addressRef,
            }}
            setCountry={setCountry}
            setCity={setCity}
            city={city}
            onSubmit={updateUserHandler}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </form>
  );
};

export default FormUploadUser;
