import createDataContext from "./createDataContext";
import lms_api from "../api/lms-server";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "set_is_loading":
      return { ...state, isLoading: true };
    case "set_alert":
      return { ...state, alert: action.payload };
    case "clear_is_loading":
      return { ...state, isLoading: false };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "clear_alert":
      return { ...state, alert: "" };
    case "signin":
      return {
        errorMessage: "",
        token: action.payload.token,
        user: action.payload.user,
        isLoading: false,
        authenticated: true,
      };
    case "add_user":
      return {
        ...state,
        usersListing: [...state.usersListing, action.payload.user],
      };
    case "edit_user":
      let index = state.usersListing.findIndex(
        (user) => user._id === action.payload._id
      );
      state.usersListing[index] = action.payload;
      return { ...state };
    case "delete_user":
      let indexx = state.usersListing.findIndex(
        (user) => user._id === action.payload
      );
      state.usersListing.splice(indexx, 1);
      return { ...state };
    case "fetch_users":
      return { usersListing: action.payload.users };
    case "signout":
      return { token: null, authenticated: false };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

const clearIsLoading = (dispatch) => {
  return async () => {
    dispatch({ type: "clear_is_loading" });
  };
};

const clearAlert = (dispatch) => {
  return () => {
    dispatch({ type: "clear_alert" });
  };
};

const signin = (dispatch) => {
  return async ({ email, password }, callback) => {
    dispatch({ type: "set_is_loading" });
    try {
      const res = await lms_api.post("/user/login", {
        email,
        password,
      });
      await localStorage.setItem("token", res.data.token);
      dispatch({ type: "signin", payload: res.data });

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const createUser = (dispatch) => {
  return async ({ email, name, profileImage, phoneNumber, userType }) => {
    try {
      const res = await lms_api.post("/user/create", {
        email,
        name,
        profileImage,
        phoneNumber,
        userType,
      });
      dispatch({ type: "add_user", payload: res.data });
      dispatch({ type: "set_alert", payload: "User added successfully" });
    } catch (err) {
      console.log(err);
    }
  };
};

const editUser = (dispatch) => {
  return async ({ email, name, phoneNumber, id }) => {
    try {
      const res = await lms_api.patch(`/user/${id}`, {
        email,
        name,
        phoneNumber,
      });
      dispatch({ type: "edit_user", payload: res.data });
      dispatch({
        type: "set_alert",
        payload: `User ${name} edited successfully`,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const uploadUserImage = (dispatch) => {
  return async ({ profileImage, id }) => {
    try {
      const res = await lms_api.patch(`/user/uploadImage/${id}`, {
        profileImage,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteUser = (dispatch) => {
  return async ({ id }) => {
    try {
      const res = await lms_api.delete(`/user/${id}`);
      dispatch({ type: "delete_user", payload: id });
      dispatch({ type: "set_alert", payload: "User deleted successfully" });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};

const fetchUsers = (dispatch) => async () => {
  dispatch({ type: "set_is_loading" });
  try {
    const res = await lms_api.get("/users");
    dispatch({ type: "fetch_users", payload: res.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "clear_is_loading" });
};

const signout = (dispatch) => {
  return () => {
    localStorage.removeItem("token");
    dispatch({ type: "signout" });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    clearErrorMessage,
    clearIsLoading,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    uploadUserImage,
    clearAlert,
  },
  {
    token: null,
    authenticated: false,
    user: null,
    usersListing: [],
    errorMessage: "",
    isLoading: false,
    alert: "",
  }
);
