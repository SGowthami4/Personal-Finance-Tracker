import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { DeleteIcon, DollarSignIcon, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart } from "react-minimal-pie-chart";

interface TransactionEntry {
  source: string;
  amount: number;
  date: string;
  type: "Income" | "Expense";
  color: string;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Dashboard() {
  const [incomeSource, setIncomeSource] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [expenseName, setExpenseName] = useState<string>("");
  const [spentAmount, setSpentAmount] = useState<string>("");
  const [expenseDate, setExpenseDate] = useState<string>("");

  const [entries, setEntries] = useState<TransactionEntry[]>(
    JSON.parse(localStorage.getItem("transactions") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(entries));
  }, [entries]);

  function handleAddIncome() {
    if (!incomeSource || !amount || !date) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newEntry: TransactionEntry = {
      source: incomeSource,
      amount: parseFloat(amount),
      date,
      type: "Income",
      color: getRandomColor(),
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);

    // Clear inputs
    setIncomeSource("");
    setAmount("");
    setDate("");
  }

  function handleAddExpense() {
    if (!expenseName || !spentAmount || !expenseDate) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newEntry: TransactionEntry = {
      source: expenseName,
      amount: parseFloat(spentAmount),
      date: expenseDate,
      type: "Expense",
      color: getRandomColor(),
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);

    // Clear inputs
    setExpenseName("");
    setSpentAmount("");
    setExpenseDate("");
  }

  function handleDelete(index: number) {
    setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  }

  const generatePieChartData = (type: "Income" | "Expense") => {
    return entries
      .filter((entry) => entry.type === type)
      .reduce((acc, entry) => {
        const existingEntry = acc.find((item) => item.title === entry.source);
        if (existingEntry) {
          existingEntry.value += entry.amount;
        } else {
          acc.push({
            title: entry.source,
            value: entry.amount,
            color: entry.color,
          });
        }
        return acc;
      }, [] as { title: string; value: number; color: string }[]);
  };

  const incomeData = generatePieChartData("Income");
  const expenseData = generatePieChartData("Expense");

  return (
    <div className="container w-screen flex flex-col justify-center items-center gap-8 mx-auto overflow-x-hidden">
      <div className="incomePart flex w-full gap-2">
        <Card className="w-1/2 mx-auto">
          <CardHeader>Income details</CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Label htmlFor="incomeSource">Income Source</Label>
            <Input
              type="text"
              id="incomeSource"
              placeholder="e.g., Salary"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
            />
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              placeholder="$350"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddIncome}>
              Add Income
              <DollarSignIcon className="mx-1 h-2.5 w-2.5 bg-white text-black rounded-lg" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-1/2 flex items-center justify-center">
          <div className="">
            <h2 className="text-xl font-semibold">Income Distribution</h2>
            <PieChart className="w-full" data={incomeData} />
          </div>
        </Card>
      </div>
      {/* Income Entry Card */}

      {/* Expense Entry Card */}
      <div className="expensePart flex w-full gap-2">
        <Card className="w-1/2 mx-auto">
          <CardHeader>Expense details</CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Label htmlFor="expenseName">Expense Name</Label>
            <Input
              type="text"
              id="expenseName"
              placeholder="e.g., Coffee"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
            <Label htmlFor="spentAmount">Amount</Label>
            <Input
              type="number"
              id="spentAmount"
              placeholder="$3.50"
              value={spentAmount}
              onChange={(e) => setSpentAmount(e.target.value)}
            />
            <Label htmlFor="expenseDate">Date</Label>
            <Input
              type="date"
              id="expenseDate"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddExpense}>
              Add Expense
              <Plus className="mx-1 h-2.5 w-2.5 bg-white text-black rounded-lg" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-1/2 flex items-center justify-center">
          <div className="">
            <h2 className="text-xl font-semibold">Expense Distribution</h2>
            <PieChart className="w-full" data={expenseData} />
          </div>
        </Card>
      </div>

      {/* Pie Charts */}
      <div className="piecharts flex w-full justify-between"></div>

      {/* Display transactions in a table */}
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.source}</TableCell>
              <TableCell>${entry.amount.toFixed(2)}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>
                <button
                  className={`${
                    entry.type === "Income" ? "bg-green-700" : "bg-red-600"
                  } rounded-lg w-20 p-2 text-white text-center`}
                >
                  {entry.type}
                </button>
              </TableCell>
              <TableCell>
                <button onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
