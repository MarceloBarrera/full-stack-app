import { Box, Button, Flex, Heading, Input, Link } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { deletePerson, getPeople, type Person } from "../../api/apis/api.ts";
import { PAGE_PATH } from "../../const.ts";
import { tableStyles } from "./People.styles.ts";
import { peopleKeys } from "../../api/react-query/queryKeys.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog.tsx";
import { toaster, ToasterComponent } from "../../components/common/toaster.tsx";

export const People = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    data: people,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [peopleKeys.all],
    queryFn: () => getPeople(),
  });
  const queryClient = useQueryClient();
  const [globalFilter, setGlobalFilter] = useState("");

  const mutation = useMutation({
    mutationFn: (id: string) => deletePerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [peopleKeys.all] });
    },
  });

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "forename",
        header: "First Name",
      },
      {
        accessorKey: "surname",
        header: "Last Name",
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        cell: ({ getValue }) =>
          new Date(getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "friends",
        header: "Total Friends",
        cell: ({ getValue }) => (getValue() as string[])?.length || 0,
        sortingFn: (rowA, rowB) => {
          const friendsA = rowA.original.friends?.length || 0;
          const friendsB = rowB.original.friends?.length || 0;
          return friendsA - friendsB;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Link asChild color={"blue.500"}>
            <RouterLink to={`/people/${row.original.id}`}>Details</RouterLink>
          </Link>
        ),
      },
      {
        id: "delete",
        header: "Delete",
        cell: ({ row }) => (
          <Button
            colorScheme="red"
            color={"red.500"}
            variant="outline"
            size="sm"
            onClick={(e) => {
              setIsOpenConfirmModal(true);
              setPersonIdToDelete(row.original.id!);
              e.stopPropagation();
            }}
          >
            Delete
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: people?.data || [], // Ensure people is defined before accessing
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error when fetching people</div>;

  const deletePersonHandler = async (personId: string) => {
    try {
      await mutation.mutateAsync(personId);
      toaster.create({
        title: "Person deleted successfully",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Failed to delete person, try again later.",
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>People Admin</Heading>
      <ToasterComponent />
      <Flex direction="column" gap={4}>
        <Box>
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            maxWidth="300px"
          />

          <Button
            ml={2}
            size="sm"
            variant={"outline"}
            onClick={() => {
              setGlobalFilter("");
            }}
          >
            Clear
          </Button>
        </Box>
        <Button
          maxWidth="150px"
          alignSelf="end"
          onClick={() => {
            navigate(PAGE_PATH.AddPerson);
          }}
        >
          Add Person
        </Button>

        <Box as="table" {...tableStyles.table} overflowX="auto">
          <thead style={{ fontWeight: "bold", textAlign: "center" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Box>
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              people?.data?.length || 0
            )}{" "}
            of {people?.data?.length} entries
          </Box>
          <Flex gap={2}>
            <Button
              size="2xs"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous"
              fontSize={12}
            >
              Prev
            </Button>

            <Button
              size="2xs"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next"
              fontSize={12}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {isOpenConfirmModal && (
        <ConfirmDialog
          isOpen={isOpenConfirmModal}
          onConfirm={async () => {
            setIsOpenConfirmModal(false);
            await deletePersonHandler(personIdToDelete!);
          }}
          onClose={() => setIsOpenConfirmModal(false)}
        />
      )}
    </Box>
  );
};

export default People;
