import { useState } from "react";
import { Box, Text, Input } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Update the initialData array to include all rows
const initialData = [
  // Room Statistics
  { category: 'Total Rooms Available', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Total Rooms Sold', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Transient Rooms Sold', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Business Transient Rooms Sold', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Group Rooms Sold', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Self Contained Group Rooms Sold', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'City Wide Group Rooms Sold', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Contract Rooms Sold', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Occupancy', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: '', type: 'blank', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  
  // ADR Statistics
  { category: 'ADR', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Transient ADR', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Business Transient ADR', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Group ADR', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Contract ADR', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Room RevPAR', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: '', type: 'blank', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  { category: 'Comp Set RevPAR', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'RevPAR Index', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: '', type: 'blank', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  
  // Department Revenues
  { category: 'Department Revenues -', type: 'header', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  { category: 'Rooms Revenue', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Food and Beverage Revenue', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Guest Communications Revenue', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Other Operated Departments Revenue', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Total Revenues', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: '', type: 'blank', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },

  // Department Expenses
  { category: 'Department Expenses -', type: 'header', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  { category: 'Rooms Expense', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Food and Beverage Expense', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Guest Communications Expense', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Other Operated Department Expense', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Total Department Expense', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: '', type: 'blank', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },

  // Department Profit
  { category: 'Department Profit -', type: 'header', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  { category: 'Rooms Dept Profit', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Food and Beverage Dept Profit', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Telephone Dept Profit', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Other Minor Dept Profit', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Departmental Profit', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: '', type: 'blank', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },

  // Undistributed Operating Expenses
  { category: 'Undistributed Operating Expenses -', type: 'header', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  { category: 'Admin. & General', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'IT&S', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'S&M (Including Franchise Fees)', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Property Operations & Maintenance', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Utilities', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Hospitality Expense', type: 'input', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: 'Total Undistributed Expense', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
  { category: '', type: 'blank', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, ''])) },
  { category: 'House Profit', type: 'calculated', ...Object.fromEntries([...Array(12)].map((_, i) => [`2026-${String(i + 1).padStart(2, '0')}`, 0])) },
];

const columns = [
  {
    accessorKey: 'category',
    header: 'Category',
    minSize: 250,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Box 
          fontWeight={value.includes('-') ? 'bold' : 'normal'}
          height="32px"
          display="flex"
          alignItems="center"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {value}
        </Box>
      );
    }
  },
  ...Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return {
      accessorKey: `2026-${month}`,
      header: `2026-${month}`,
      size: 100,
      cell: ({ getValue, row, column, table }) => {
        const value = getValue();
        const type = row.original.type;

        if (type === 'blank' || type === 'header') {
          return (
            <Box height="32px" display="flex" alignItems="center" whiteSpace="nowrap">
              {''}
            </Box>
          );
        }

        if (type === 'input') {
          return (
            <Box height="32px" display="flex" alignItems="center">
              <Input
                value={value}
                size="sm"
                height="24px"
                width="100%"
                onChange={(e) => {
                  table.options.meta?.updateData(
                    row.index,
                    column.id,
                    e.target.value
                  );
                }}
              />
            </Box>
          );
        }

        if (type === 'calculated') {
          return (
            <Box 
              height="32px" 
              display="flex" 
              alignItems="center"
              whiteSpace="nowrap"
              bg="gray.100"
              width="100%"
              pl={2}
            >
              {(() => {
                switch (row.original.category) {
                  case 'Occupancy':
                    const available = table.getRow(0).getValue(column.id) || 0;
                    const sold = table.getRow(1).getValue(column.id) || 0;
                    return available ? ((sold / available) * 100).toFixed(1) + '%' : '0%';
                  case 'Room RevPAR':
                    const adr = table.getRow(9).getValue(column.id) || 0;
                    const occ = parseFloat((table.getRow(8).getValue(column.id) || '0%').replace('%', '')) / 100;
                    return (adr * occ).toFixed(2);
                  case 'RevPAR Index':
                    const revpar = parseFloat(table.getRow(15).getValue(column.id) || 0);
                    const compRevpar = table.getRow(16).getValue(column.id) || 0;
                    return compRevpar ? ((revpar / compRevpar) * 100).toFixed(1) + '%' : '0%';
                  default:
                    return value;
                }
              })()}
            </Box>
          );
        }

        return value;
      },
    };
  }),
  // Add the FY-2026 column
  {
    accessorKey: 'fy-2026',
    header: 'FY-2026',
    size: 100,
    cell: ({ row }) => {
      const type = row.original.type;
      
      if (type === 'blank' || type === 'header') {
        return (
          <Box height="32px" display="flex" alignItems="center" whiteSpace="nowrap">
            {''}
          </Box>
        );
      }

      // Add bg="gray.100" to match other calculated cells
      return (
        <Box 
          height="32px" 
          display="flex" 
          alignItems="center" 
          whiteSpace="nowrap"
          bg={type === 'calculated' ? "gray.100" : "transparent"}
          width="100%"
          pl={2}
        >
          {(() => {
            if (type === 'calculated' && row.original.category === 'Occupancy') {
              const sum = Object.entries(row.original)
                .filter(([key]) => key.startsWith('2026-'))
                .reduce((acc, [_, value]) => acc + (parseFloat(value) || 0), 0);
              return (sum / 12).toFixed(1) + '%';
            }

            if (type === 'calculated' && row.original.category === 'RevPAR Index') {
              const sum = Object.entries(row.original)
                .filter(([key]) => key.startsWith('2026-'))
                .reduce((acc, [_, value]) => acc + (parseFloat(value) || 0), 0);
              return (sum / 12).toFixed(1) + '%';
            }

            const sum = Object.entries(row.original)
              .filter(([key]) => key.startsWith('2026-'))
              .reduce((acc, [_, value]) => acc + (parseFloat(value) || 0), 0);
            return sum.toFixed(2);
          })()}
        </Box>
      );
    }
  }
];

const TaskTable = () => {
  const [data, setData] = useState(initialData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: parseFloat(value) || 0,
                }
              : row
          )
        );
      },
    },
  });

  return (
    <Box overflowX="auto">
      <Box className="table" w="max-content">
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box 
                className="th" 
                w={header.getSize()} 
                key={header.id}
                height="32px"
                display="flex"
                alignItems="center"
                whiteSpace="nowrap"
              >
                {header.column.columnDef.header}
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const isCalculated = row.original.type === 'calculated';
              const isTotal = ['Total Revenues', 'Total Department Expense', 'Total Undistributed Expense', 'House Profit'].includes(row.original.category);
              
              return (
                <Box 
                  className={`td ${isCalculated && isTotal ? 'calculated' : ''}`}
                  w={cell.column.getSize()} 
                  key={cell.id}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskTable;
