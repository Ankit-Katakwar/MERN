import React, { useEffect, useState } from "react";
import axios from "axios";
import DataList from "./DataList";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export default function Data() {
  let [allData, setallData] = useState([]);
  let [formData, setformData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    _id: "",
  });

  let getValue = (e) => {
    let insert = e.target.name;
    let value = e.target.value;
    let oldData = { ...formData };
    oldData[insert] = value;
    setformData(oldData);
  };

  const prevent = (e) => {
    e.preventDefault(); 

    if (formData._id) {
      console.log(formData)
      axios.put(
          `http://localhost:9795/server/api/data/data-update/${formData._id}`,
          formData
        )
        .then((res) => {
          console.log(res)
          setformData({
            name: "",
    email: "",
    number: "",
    message: "",
    _id: "",
          });
          getAllData()
        });
    } else {
      axios
        .post("http://localhost:9795/server/api/data/data-insert", formData)
        .then((res) => {
          setformData({ name: "", email: "", number: "", message: "" });

          getAllData();
        });
    }
  };

  let getAllData = () => {
    axios
      .get("http://localhost:9795/server/api/data/data-view")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setallData(finalData.dataList);
        }
      });
  };
  console.log(formData);
  useEffect(() => {
    console.log(getAllData());
  }, []);
  return (
    <div className="grid grid-cols-[30%_auto] gap-8 bg-gray-300 w-full ">
      <div className="  bg-gray-900 p-10">
        <form action="" className="flex flex-col gap-4" onSubmit={prevent}>
          <div className="mb-2 block text-white">
            <Label htmlFor="email1"> Name</Label>
            <TextInput
              name="name"
              type="name"
              onChange={getValue}
              value={formData.name}
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-2 block ">
            <Label htmlFor="email" className="  ">
              Email
            </Label>
            <TextInput
              name="email"
              type="email"
              onChange={getValue}
              value={formData.email}
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-2 block ">
            <Label htmlFor="number" className="  ">
              Number
            </Label>
            <TextInput
              name="number"
              type="text"
              onChange={getValue}
              value={formData.number}
              placeholder="Your number here"
              required
            />
          </div>
          <div className="mb-2 block ">
            <Label htmlFor="message" className="  ">
              Message
            </Label>
            <Textarea
              name="message"
              onChange={getValue}
              value={formData.message}
              placeholder="Leave a comment..."
              required
              rows={5}
            />
          </div>

          <Button type="submit" > {formData._id ? "Update" : "Save"}</Button>
        </form>
      </div>
      <DataList
        data={allData}
        getAllData={getAllData}
        Swal={Swal}
        setformData={setformData}
      />
    </div>
  );
}
