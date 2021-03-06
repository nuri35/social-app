import React, { useState, useContext } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import "antd/dist/antd.min.css";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Comment } from "antd";
import moment from "moment";
import { notification } from "antd";
import { AuthContext } from "./Context";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ReportOutlined from "@mui/icons-material/ReportOutlined";
import LikeDislike from "./LikeDislike";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { removeNotify, createNotify } from "../actions/notify";
const SingleComment = (props) => {
  const { user, ─▒sAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state);
  const [popoverContent, setPopoverContent] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [whichProps, setEditWhichProps] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsVisible(!isVisible);

    if (props.comment.writer.google) {
      if (user.id === props.comment.writer.google.id) {
        setPopoverContent(true);
        setEditWhichProps(props.comment._id);
      } else {
        setPopoverContent(false);
      }
    } else {
      if (user.id === props.comment.writer.local.id) {
        setPopoverContent(true);
        setEditWhichProps(props.comment._id);
      } else {
        setPopoverContent(false);
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsVisible(!isVisible);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [editInput, setEditInput] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Login
      </Button>
    );
    notification.open({
      message: "Do you want to answer someone?",
      description:
        "Sign in to share your thoughts.And Touch people's lives by commenting on posts",
      btn,
      key,
    });
  };

  const deleteNotifaction = (message) => {
    notification.open({
      message: "Ohhhh!?",
      description: `${message}`,
    });
  };

  const [commentInput, setCommentInput] = useState(false);

  const [Commentval, setCommentval] = useState("");

  const [editButton, setEditButton] = useState(false);

  const [EditInputValue, setEditInputValue] = useState(props.comment.content);

  const handleChange = (e) => {
    e.preventDefault();

    setCommentval(e.currentTarget.value);

    setIsVisible(!isVisible);
  };

  const handleChangeEdit = (e) => {
    e.preventDefault();

    setEditInputValue(e.currentTarget.value);
    setEditButton(true);

    setIsVisible(!isVisible);

    if (
      Number(e.currentTarget.value.length) ===
      Number(props.comment.content.length)
    ) {
      setEditButton(false);
    }
  };

  const showCommentInput = () => {
    setCommentInput(!commentInput);
    setIsVisible(!isVisible);
  };

  const showEditInput = () => {
    setEditInput(!editInput);
  };

  const handleChangeVisible = () => {
    setIsVisible(!isVisible);
  };

  const hideCommentInputEdit = () => {
    setEditInput(!editInput);
    setIsVisible(!isVisible);
    setEditButton(false);
  };

  const hideCommentInput = () => {
    setCommentInput(false);
    setCommentval("");
    setIsVisible(!isVisible);
  };
  const actions = [
    ─▒sAuthenticated && !editInput ? (
      <LikeDislike
        comment
        commentId={props.comment._id}
        userId={user.id}
        postId={props.postId}
        receiverId={props.receiverId}
        senderName={user.name}
        user─░mageSender={user.avatar}
      />
    ) : (
      <></>
    ),
    ─▒sAuthenticated ? (
      <Tooltip title="Settings">
        <IconButton
          hidden={isVisible ? false : true}
          disabled={editInput ? true : false}
          sx={{ position: "absolute", left: "500", top: "10px" }}
        >
          <MoreVertOutlinedIcon onClick={handleClick} />
        </IconButton>
      </Tooltip>
    ) : (
      <></>
    ),
    ─▒sAuthenticated && !editInput ? (
      <span key="comment-basic-reply-to" onClick={showCommentInput}>
        Reply to
      </span>
    ) : (
      <></>
    ),
  ];

  const commentSub = async (e) => {
    e.preventDefault();

    if (─▒sAuthenticated) {
      setLoading(true);
      try {
        const variables = {
          content: Commentval,
          writer: user.id,
          postId: props.postId._id,
          responseTo: props.comment._id,
        };

        const commentVariables = await axios.post("/api/comment", variables, {
          withCredentials: true,
        });

        if (commentVariables.data.success) {
          const msg = {
            id: commentVariables.data.result[0]._id,
            text: "mentioned you in a comment.",
            recipients: [props.comment.writer._id],
            url: `/post/${props.postId}`,
          };

          dispatch(createNotify({ msg, socket, user }));

          setCommentval("");
          setCommentInput(false);
          props.refreshFunction(commentVariables.data.result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      openNotification();
    }
  };

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const variables = {
        content: EditInputValue,
        index: props.parentCommentId,
        postId: props.postId._id,
      };

      const editCommentResult = await axios.put("/api/comment", variables, {
        withCredentials: true,
      });

      if (editCommentResult.data.success) {
        setEditInput(!editInput);
        setIsVisible(!isVisible);
        setEditButton(false);
        props.editFunction(editCommentResult.data.updatedProduct);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAction = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const deleteArr = [
        ...props.CommentLists.filter(
          (cm) => cm.responseTo === props.comment._id
        ),
        props.comment,
      ];

      deleteArr.forEach(async (element) => {
        const deleteResult = await axios.delete(
          `/api/comment/${element._id}?postId=${props.postId._id}`,
          {
            withCredentials: true,
          }
        );

        if (deleteResult.data.success) {
          const msg = {
            id: whichProps,
            text: props.comment.responseTo
              ? "mentioned you in a comment."
              : "has commented on your post.",
            recipients: props.comment.responseTo
              ? [deleteResult.data.─▒tem.responseTo.writer]
              : [props.receiverId],
            url: `/post/${props.postId}`,
          };

          dispatch(removeNotify({ msg, socket }));

          setIsVisible(!isVisible);
          deleteNotifaction(deleteResult.data.message);

          props.deleteFunction(deleteResult.data.─▒tem);
          setLoading(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, position: "relative", left: "200px" }}
      spin
    />
  );

  return (
    <div>
      <>
        <Comment
          actions={actions}
          author={
            <h3>
              {props.comment.writer.google
                ? `${props.comment.writer.google.name}`
                : `${props.comment.writer.local.name} ${props.comment.writer.local.surname}`}
            </h3>
          }
          avatar={
            props.comment.writer.google ? (
              <Avatar
                src={props.comment.writer.google.avatar}
                size={"large"}
              ></Avatar>
            ) : (
              <Avatar src={props.comment.writer.local.avatar}></Avatar>
            )
          }
          content={
            editInput ? (
              <>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <Input
                      id="standard-adornment-amount"
                      placeholder="Edit a public comment"
                      onChange={handleChangeEdit}
                      value={EditInputValue}
                    />
                  </FormControl>
                  <Button
                    sx={{ left: "360px" }}
                    variant="text"
                    color="primary"
                    onClick={hideCommentInputEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ left: "380px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={editButton ? false : true}
                    onClick={onSubmitEdit}
                  >
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <p>{props.comment.content}</p>
            )
          }
          datetime={
            <Tooltip>
              <span>{moment(props.comment.updatedAt).fromNow()}</span>
            </Tooltip>
          }
          onMouseOver={handleChangeVisible}
          onMouseOut={handleChangeVisible}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {popoverContent ? (
            <>
              <IconButton>
                <EditOutlined onClick={showEditInput} />
              </IconButton>
              <IconButton>
                <DeleteOutline onClick={deleteAction} />
              </IconButton>
            </>
          ) : (
            <IconButton>
              <ReportOutlined />
            </IconButton>
          )}
        </Popover>

        {commentInput ? (
          <>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <Input
                  id="standard-adornment-amount"
                  placeholder="Add a public comment"
                  onChange={handleChange}
                  value={Commentval}
                />
              </FormControl>
              <Button
                sx={{ left: "470px" }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={Commentval ? false : true}
                onClick={commentSub}
              >
                Comment
              </Button>
              <Button
                sx={{ left: "250px" }}
                variant="text"
                color="primary"
                onClick={hideCommentInput}
              >
                Cancel
              </Button>
            </Box>

            {user.avatar ? (
              <Avatar
                src={user.avatar}
                sx={{
                  position: "relative",

                  bottom: "90px",
                  right: "50px",
                }}
              ></Avatar>
            ) : (
              <Avatar src={user.avatar}></Avatar>
            )}
          </>
        ) : (
          <></>
        )}

        {loading ? <Spin indicator={antIcon} /> : <></>}
      </>
    </div>
  );
};

export default SingleComment;
