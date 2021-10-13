import createDataContext from "./createDataContext";
import lms_api from "../api/lms-server";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_alert":
      return { ...state, alert: action.payload };
    case "clear_alert":
      return { ...state, alert: "" };
    case "set_is_loading":
      return { ...state, isLoading: true };
    case "clear_is_loading":
      return { ...state, isLoading: false };
    case "add_class":
      return {
        ...state,
        classListing: [...state.classListing, action.payload.class],
      };
    case "edit_class":
      let index = state.classListing.findIndex(
        (item) => item._id === action.payload._id
      );
      state.classListing[index] = action.payload;
      return { ...state };
    case "delete_class":
      let indexx = state.classListing.findIndex(
        (item) => item._id === action.payload
      );
      state.classListing.splice(indexx, 1);
      return { ...state };
    case "fetch_classes":
      return { classListing: action.payload.classes };
    default:
      return state;
  }
};

const clearAlert = (dispatch) => {
  return () => {
    dispatch({ type: "clear_alert" });
  };
};

const createClass = (dispatch) => {
  return async ({ className, classCode, subject, teacherId }) => {
    try {
      const res = await lms_api.post("/class/create", {
        className,
        classCode,
        subject,
        teacherId,
      });
      dispatch({ type: "add_class", payload: res.data });
      dispatch({ type: "set_alert", payload: "Class created successfully" });
    } catch (err) {
      console.log(err);
    }
  };
};

const editClass = (dispatch) => {
  return async ({ classCode, className, subject, id }) => {
    try {
      const res = await lms_api.patch(`/class/${id}`, {
        classCode,
        className,
        subject,
      });
      dispatch({ type: "edit_class", payload: res.data });
      dispatch({
        type: "set_alert",
        payload: `Class ${classCode} edited successfully`,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteClass = (dispatch) => {
  return async ({ id }) => {
    try {
      const res = await lms_api.delete(`/class/${id}`);
      dispatch({ type: "delete_class", payload: id });
      dispatch({ type: "set_alert", payload: "Class deleted successfully" });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};

const fetchClasses = (dispatch) => async () => {
  dispatch({ type: "set_is_loading" });
  try {
    const res = await lms_api.get("/classes");
    dispatch({ type: "fetch_classes", payload: res.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "clear_is_loading" });
};

const assignClassStudent = (dispatch) => {
  return async ({ studentId, classId }) => {
    try {
      const res = await lms_api.patch("student/add", {
        studentId,
        classId,
      });
      dispatch({
        type: "set_alert",
        payload: "Class assigned successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const assignClassTeacher = (dispatch) => {
  return async ({ teacherId, classId }) => {
    try {
      const res = await lms_api.patch("teacher/assign", {
        teacherId,
        classId,
      });
      dispatch({
        type: "set_alert",
        payload: "Class assigned successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    createClass,
    clearAlert,
    fetchClasses,
    editClass,
    deleteClass,
    assignClassTeacher,
    assignClassStudent,
  },
  { alert: "", classListing: [], isLoading: false }
);
