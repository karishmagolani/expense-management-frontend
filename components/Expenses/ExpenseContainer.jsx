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
  Grid,
  Dropdown,
  Input,
} from "semantic-ui-react";
import AddNewModal from "./AddNewModal";
import { format } from "date-fns";
import AddNewCategoryModal from "../Categories/AddNewCategoryModal";
import { sortMenu } from "./utils";
import { getCategories } from "../Categories/utils";

const ExpenseContainer = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sorting, setSorting] = useState("desc"); //desc | asc
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [user, setUser] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const fetchCategories = async () => {
    const _categories = await getCategories();
    setCategories(_categories);
  };

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
    let body = {
      order: sorting,
    };
    if (selectedCategory && selectedCategory.length > 0) {
      body.category_ids = selectedCategory;
    }
    if (startDate && endDate) {
      body.date = {
        lt: endDate,
        gte: startDate,
      };
    }
    const response = await fetch(`${"http://localhost:8080"}/expenses/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": window.localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const _expenses = await response.json();
    console.log("exp", _expenses);
    expenses && setExpenses([..._expenses]);
  };

  const getCategoryOptions = () => {
    const options = [];
    categories &&
      categories.map((item) => {
        options.push({
          key: item._id,
          value: item._id,
          text: item.category_name,
        });
      });
    setCategoryOptions(options);
  };

  useEffect(() => {
    const makeInitialCalls = async () => {
      await getUser();
      await getExpenses();
      await fetchCategories();
    };
    makeInitialCalls();
  }, []);

  // create dropdown options whenever categories updated
  useEffect(() => {
    getCategoryOptions();
  }, [categories]);

  //
  useEffect(() => {
    getExpenses();
  }, [selectedCategory, sorting, startDate, endDate]);

  const handleOnCategorySelect = (value) => {
    const isSlected = selectedCategory.some((item) => {
      return item === value;
    });
    console.log(isSlected);
    if (!isSlected) {
      const temp = selectedCategory;
      temp.push(value);
      setSelectedCategory([...temp]);
    }
  };

  const handleOnCategoryRemove = (value) => {
    const arr = selectedCategory;
    arr = arr.filter((item) => item !== value);
    setSelectedCategory(arr);
  };

  console.log("env", process.env, selectedCategory, typeof startDate);
  return (
    <Segment>
      <Header textAlign="center" as="h1">
        Expenses {user && `for ${user.name}`}
      </Header>
      <Divider />
      <Grid>
        <Grid.Row columns={6}>
          <Grid.Column>
            <Header as="h5">Sort by Date</Header>
            <Dropdown
              placeholder={"sort by date"}
              options={sortMenu}
              fluid
              selection
              onChange={(_e, data) => setSorting(data.value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h5">Start Date</Header>
            <Input
              type="date"
              onChange={(_e, data) => {
                setStartDate(data.value);
                setEndDate("");
              }}
              // max={endDate}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h5">End Date</Header>
            <Input
              type="date"
              onChange={(_e, data) => {
                setEndDate(data.value);
              }}
              value={endDate}
              min={startDate}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h5">Filter by category</Header>
            <Dropdown
              text={"category"}
              options={categoryOptions}
              onChange={(_e, data) => {
                handleOnCategorySelect(data.value);
              }}
              fluid
              selection
            />
          </Grid.Column>
          <Grid.Column>
            <Divider hidden />
            <Button secondary onClick={() => setShowModal(true)}>
              Add New Expense
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Divider hidden />

            <Button color="olive" onClick={() => setShowCategoryModal(true)}>
              Add New Category
            </Button>
          </Grid.Column>{" "}
        </Grid.Row>
      </Grid>
      {showModal && (
        <AddNewModal
          closeModal={() => setShowModal(false)}
          showModal={showModal}
          getExpenses={getExpenses}
          categories={categories}
        />
      )}
      {showCategoryModal && (
        <AddNewCategoryModal
          closeModal={() => setShowCategoryModal(false)}
          showModal={showCategoryModal}
          getCategories={fetchCategories}
        />
      )}

      <Grid>
        {selectedCategory.map((item) => {
          const cat = categories.find((o) => o._id === item);
          return (
            <Grid.Column key={cat._id} width={2}>
              <Label>
                <span style={{ marginRight: "2px" }}>{cat.category_name}</span>{" "}
                <Icon
                  name="x"
                  onClick={() => handleOnCategoryRemove(item)}
                ></Icon>
              </Label>
            </Grid.Column>
          );
        })}
      </Grid>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop: "25px",
        }}
      >
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/categories")}
        >
          {" "}
          VIEW ALL CATEGORIES
        </div>
      </div>
      <Divider />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Expense</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Remarks</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
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
                    <Label style={{ cursor: "pointer" }}>Update</Label>
                    <Label style={{ cursor: "pointer" }}>Delete</Label>
                  </Table.Cell>
                  <Table.Cell>
                    {item.category && (
                      <Label
                        ribbon="right"
                        style={{ width: "100%" }}
                        // color="orange"
                        color={
                          item.category.color ? item.category.color : "orange"
                        }
                      >
                        {item.category.category_name}
                      </Label>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
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
