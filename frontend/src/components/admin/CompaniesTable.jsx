import React from "react";
import { useSelector } from "react-redux";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {

    const navigate = useNavigate();

    const { companies, searchCompanyByText } = useSelector(
        (store) => store.company
    );

    // Filter companies by name
    const filteredCompanies = companies?.filter((company) =>
        company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );

    return (
        <div className="my-5">

            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {filteredCompanies?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No companies found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredCompanies.map((company) => (
                            <TableRow key={company._id}>

                                <TableCell>
                                    <img
                                        src={company.logo}
                                        alt="logo"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </TableCell>

                                <TableCell>{company.name}</TableCell>

                                <TableCell>
                                    {company.createdAt.split("T")[0]}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            navigate(`/admin/companies/${company._id}`)
                                        }
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))
                    )}

                </TableBody>

            </Table>

        </div>
    );
};

export default CompaniesTable;