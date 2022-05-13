import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Menu,
  MenuItem,
  styled,
  ButtonProps
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import contactStyle from "../styles.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { teal } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[500],
  '&:hover': {
    backgroundColor: teal[700],
  },
}));

interface IUser {
  nickname: string;
  name: string;
  picture: string;
  updated_at: Date;
  email: string;
  email_verified: boolean;
  sub: string;
}
interface IAllUsers {
  createdAt: string,
  email: string,
  id: number,
  updatedAt: string,
}

function Contacts({
  contactList,
  fetchOneChat,
  setRecipientEmail,
  blockUser,
  blockList,
  unBlockUser,
  Loading,
  newMessageList,
  newUnread,
  allUsers
}: {
  contactList?: any;
  fetchOneChat: any;
  setRecipientEmail: any;
  blockUser: any;
  blockList: string[] | undefined;
  unBlockUser: any;
  Loading?:any;
  newMessageList?:any;
  newUnread?:string[];
  allUsers?:any;
}) {
  const { user, } = useAuth0();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [blockUserIndex, setBlockUserIndex] = useState<number>();
  const [modalText, setModalText] = useState({ heading: " ", text: " " });
  const [contactsType, setContactsType] = useState("online")
  const [displaying,setDisplaying] = useState<any[]>([])

  const [activeContact, setActiveContact] = useState(0);
  const setStyle = (value: number) => {
    setActiveContact(value);
    setRecipientEmail(contactList[value]);
    fetchOneChat(contactList[value]);
    console.log(value);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event?: any) => {
    if (event) {
      event.stopPropagation();
    }

    setAnchorEl(null);
  };
  const handleSelection = (index: number) => {
    handleClose();
    setBlockUserIndex(index);
    if (blockList?.includes(contactList[index])) {
      setModalText((prev) => {
        return {
          ...prev,
          heading: "Unblock User?",
          text: "Do you want to unblock this User?",
        };
      });
    } else {
      setModalText((prev) => {
        return {
          ...prev,
          heading: "Block User?",
          text: "Do you want to block this User?",
        };
      });
    }
    handleClickOpen();
  };
  const handleBlockUserAccept = () => {
    if (typeof blockUserIndex === "number") {
      if (blockList?.includes(contactList[blockUserIndex])) {
        unBlockUser(contactList?.[blockUserIndex]);
      } else {
        blockUser(contactList?.[blockUserIndex]);
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    handleCloseDialog();
  };
  const handleSetContactsType = (value:string)=>{
    setContactsType(value)
    setDisplaying(value==="online"? contactList: allUsers)
  }
  const handleAllUsers =(value:number)=>{
    setActiveContact(value);
    setRecipientEmail(displaying[value]?.email);
    fetchOneChat(displaying[value]?.email);
    console.log(value);
  }

  useEffect(()=>{
    if(contactList?.length){
      // fetchOneChat(contactList[0])
    }
  },[])
  // console.log(contactList,newUnread)

  return (
    <Box>
      <Card sx={{ margin: "5rem", height: "92vh",minWidth:"30rem",fontSize:"1.6rem"  }}>
        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            margin: "5rem 0",
          }}
        >
          <Avatar src={user?.picture}></Avatar>
          <Box sx={{ margin: "1rem 0 4rem 0" }}>
            <b>Account:</b> {user?.email}
          </Box>
          <hr
            style={{
              border: "solid 1px #f7f7f7",
              width: "80%",
              margin: "0 10rem",
            }}
          ></hr>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-around"}}>
          <ColorButton variant={"contained"} sx={{width:"12rem"}} onClick={()=>handleSetContactsType("online")}>
            Users Online
          </ColorButton>
          <ColorButton variant={"contained"} sx={{width:"12rem"}} onClick={()=>handleSetContactsType("all_users")}>
            All Users
          </ColorButton>
        </Box>
        <Box sx={{ textAlign: "center", margin: "5rem 0 1rem 0rem" }}>
          {
            contactsType==="online" ? <b>Users Online</b> : <b>All Users</b>
          }
         
        </Box>

        {!Loading && 
          (<Box sx={{ height: "100vh", overflowY: "scroll" }}>
            <Card elevation={0} sx={{ margin: "0rem 1rem",marginBottom:"50vh" }}>
              {displaying?.length ? (
                displaying.map((element: any, index: number) => (
                  <Box
                  
                    className={
                      index === activeContact
                        ? contactStyle.activeclass
                        : contactStyle.inactiveclass
                    }
                    onClick={contactsType==="online"? () => setStyle(index): ()=>handleAllUsers(index)}
                    sx={{
                      display: "flex",
                      justifyContent: "space_between",
                      alignItems: "center",
                      margin: "2rem",
                      padding: "0.8rem",
                      borderRadius: "15px",
                      cursor: "pointer",
                      minWidth: "25rem",
                    }}
                    key = {element?.email}
                  > 
                  {newUnread && contactsType==="online" && newUnread?.includes(element) ?
                  <Badge 
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={"+"} color="info" sx={{width:"4rem"}}>
                     <Avatar sx={{ marginRight: "5rem" }} />
                  </Badge>
                  : 
                  <Avatar sx={{ marginRight: "1rem" }} />
                  
                  }
                    <span style={{ width: "60%",marginLeft:"1rem"}}>{contactsType==="online"?element.split("@")[0] :element?.email.split("@")[0]}</span>
                    <Box
                      onClick={handleClick}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <MoreVertIcon
                        sx={{ marginLeft: "0rem", fontSize: "2.5rem" }}
                      />
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={() => handleSelection(index)}>
                          {blockList && blockList.includes(contactList[index])
                            ? "Unblock"
                            : "Block"}
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: "center" }}>No users online yet...</Box>
              )}
            </Card>
          </Box>)}
          {Loading && <Box sx={{ display:"flex",justifyContent:"center"}}><Loading size ={18}/></Box>}
      </Card>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{modalText?.heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {modalText.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleBlockUserAccept}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Contacts;
