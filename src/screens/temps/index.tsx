import { Divider } from "@mui/material";
import { useState } from "react";
// import { UserAdd } from "../../Config/FirebaseMethod";



function AppInp(props:any) {
  const { label, onChange, type, value ,name} = props;
  return (
    <>
      <input
        className="p-3 border-teal-700 w-full outline-none rounded"
        placeholder={label}
        value={value}
        onChange={onChange}
        type={type ?? "text"}
        name={name}
      ></input>
    </>
  );
}

export default function UserRegister() {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: "",
    cnic: "",
    contact: "",
  });

  const AddForm = () => {
    console.log(userForm)
    // UserAdd('form', userForm)
    //   .then(() => {
    //     console.log("Data Sent");

    //     setUserForm({
    //       name: "",
    //       email: "",
    //       password: "",
    //       cnic: "",
    //       contact: "",
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };


  const handleInputChange = (e:any) => {
    const { name, value } = e.target;

    setUserForm({
      ...userForm,
      [name]: value,
    });
    console.log(e.target.value)
    // console.log(e.target.name)
    // console.log(name)
    console.log(value)
  };

  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-bold py-4">User Register:</h1>
        <Divider />
        <div className="inst-form py-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-b-2 border-slate-200 text-black">
              <AppInp
                name="name"
                value={userForm.name}
                onChange={handleInputChange}
                label="Name"
              />
            </div>
            <div className="border-b-2 border-slate-200">
              <AppInp
                name="email"
                value={userForm.email}
                onChange={handleInputChange}
                label="Email"
              />
            </div>
            <div className="border-b-2 border-slate-200">
              <AppInp
                name="password"
                value={userForm.password}
                onChange={handleInputChange}
                label="Password"
              />
            </div>
            <div className="border-b-2 border-slate-200">
              <AppInp
                name="cnic"
                value={userForm.cnic}
                onChange={handleInputChange}
                label="CNIC"
              />
            </div>
            <div className="border-b-2 border-slate-200">
              <AppInp
                name="contact"
                value={userForm.contact}
                onChange={handleInputChange}
                label="Contact"
              />
            </div>
          </div>
        </div>
        <button
          onClick={AddForm}
        >Submit</button>
      </div>
    </>
  );
}