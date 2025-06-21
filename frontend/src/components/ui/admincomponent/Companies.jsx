import React, { useEffect, useState } from "react";



import { useNavigate } from "react-router-dom";

// import useGetAllCompanies from "@/hooks/usegetAllCompanies";
// import { useDispatch } from "react-redux";
// import { setSearchCompanyByText } from "@/redux/companyslice";
import { Input } from "../input";
import { Button } from "../button";
import { useDispatch } from "react-redux";
import Navbar from "../componennts_lite/shared/Navbar";
import CompaniesTable from "./CompaniesTabl";

const Companies = () => {
  const navigate = useNavigate();

//   useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;