import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Icon,
  Label,
  Menu,
  Table,
  Divider,
  Button,
} from "semantic-ui-react";
import AddNewModal from "./AddNewModal";
import { format } from "date-fns";

const ExpenseContainer = () => {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getUser = async () => {
    const response = await fetch(`${"http://localhost:8080"}/user/me`, {
      headers: {
        "x-access-token": window.localStorage.getItem("token"),
      },
    });
    const _user = await response.json();
    setUser(_user);
  };

  const getExpenses = async () => {
    const response = await fetch(`${"http://localhost:8080"}/expenses`, {
      headers: {
        "x-access-token": window.localStorage.getItem("token"),
      },
    });
    const _expenses = await response.json();
    console.log("exp", _expenses);
    setExpenses(_expenses);
  };

  useEffect(() => {
    const makeInitialCalls = async () => {
      await getUser();
      await getExpenses();
    };
    makeInitialCalls();
  }, []);

  console.log("env", process.env.API_ENDPOINT);
  return (
    <Segment>
      <Header textAlign="center" as="h1">
        Expenses {user && `for ${user.name}`}
      </Header>

      <Divider />
      <Button secondary onClick={() => setShowModal(true)}>
        Add New
      </Button>
      {showModal && (
        <AddNewModal
          closeModal={() => setShowModal(false)}
          showModal={showModal}
          getExpenses={getExpenses}
        />
      )}
      <Divider />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Expense</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Remarks</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {expenses &&
            expenses.map((item) => {
              var date = item.date ? new Date(item.date) : null;

              var formattedDate = date ? format(date, "MMMM do, yyyy") : "";

              console.log(formattedDate);
              return (
                <Table.Row key={item.expense_name + item.amount}>
                  <Table.Cell>{item.expense_name}</Table.Cell>
                  <Table.Cell>₹{item.amount}</Table.Cell>
                  <Table.Cell>{formattedDate}</Table.Cell>
                  <Table.Cell>{item.remarks}</Table.Cell>
                  <Table.Cell>
                    <Label ribbon>{item.category}</Label>
                  </Table.Cell>
                  <Table.Cell>Update Delete</Table.Cell>
                </Table.Row>
              );
            })}
          {/* <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row> */}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  );
};

export default ExpenseContainer;
