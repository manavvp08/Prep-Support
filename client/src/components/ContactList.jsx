import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminNavbar from "./AdminNavbar";
import DataTable from "react-data-table-component";

const ContactList = ({ isAuth, isAdmin }) => {
  const [contacts, setContacts] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const getContacts = async () => {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER}/get-contact-list`
      );
      response = await response.json();
      console.log(response)
      setContacts(response?.data);
    };

    getContacts();
  }, []);

  const columns = [
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "message",
      selector: (row) => row.message,
      sortable: true,
    },
  ];
  const customStyles = {
    header: {
      style: {
        fontFamily: "Sans-serif",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f2f2f2",
        fontFamily: "Sans-serif",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontFamily: "Sans-serif",
      },
    },
    rows: {
      style: {
        fontFamily: "baloo-bhai-2",
        fontSize: "20px",
      },
    },
    pagination: {
      style: {
        fontFamily: "Sans-serif",
      },
    },
  };

  return (
    <>
      {isAuth && isAdmin ? <AdminNavbar /> : <Navbar />}
      <div className="mt-14 p-12">
        <DataTable
          customStyles={customStyles}
          className="dataTables_wrapper"
          title="Contact List"
          columns={columns}
          data={contacts}
          fixedHeader
          pagination
          responsive
          highlightOnHover
          pointerOnHover
        />
      </div>
      <Footer />
    </>
  );
};

export default ContactList;
