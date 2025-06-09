import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import axios from "axios";
export default function DataList({ data, getAllData, Swal, setformData }) {
  let delRow = (delID, naam) =>
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:9795/server/api/data/data-delete/${delID}`)
          .then(console.log(naam + " is delete from the data."));

        Swal.fire({
          title: "Deleted!",
          text: `Your file named "${naam}" has been deleted.`,
          icon: "success",
        });
        getAllData();
      }
    });

  let singleRow = (uID) => {
    axios
      .get(`http://localhost:9795/server/api/data/data-row/${uID}`)
      .then((res) => {
        let data = res.data.updateRow;
        setformData(data)
      });
    
  };

  return (
    <div>
      <div className="overflow-x-auto bg-gray-900 rounded-none ">
        <Table className="bg-gray-900">
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr.No</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Number</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>
                <span>Delete</span>
              </TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {data.length >= 1 ? (
              data.map((item, idx) => {
                return (
                  <TableRow
                    key={idx}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.number}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => {
                          delRow(item._id, item.name);
                        }}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Delete
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => {
                          singleRow(item._id);
                        }}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell colSpan={7} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
