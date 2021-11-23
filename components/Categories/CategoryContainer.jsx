import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  Menu,
  Segment,
  Table,
} from "semantic-ui-react";
import AddNewCategoryModal from "./AddNewCategoryModal";
import { getCategories } from "./utils";

const CategoryContainer = () => {
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const fetchCategories = async () => {
    const _categories = await getCategories();
    setCategories(_categories);
  };

  useEffect(() => {
    const makeInitialCalls = async () => {
      await fetchCategories();
    };
    makeInitialCalls();
  }, []);
  return (
    <Segment>
      <Header textAlign="center" as="h1">
        Categories
      </Header>
      <Divider />
      <Grid.Row columns={6}>
        <Grid.Column>
          <Divider hidden />

          <Button color="olive" onClick={() => setShowCategoryModal(true)}>
            Add New Category
          </Button>
        </Grid.Column>
      </Grid.Row>
      {showCategoryModal && (
        <AddNewCategoryModal
          closeModal={() => setShowCategoryModal(false)}
          showModal={showCategoryModal}
          getCategories={fetchCategories}
        />
      )}
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
          onClick={() => (window.location.href = "/expenses")}
        >
          VIEW EXPENSES
        </div>
      </div>
      <Divider />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Remarks</Table.HeaderCell>
            <Table.HeaderCell>Color</Table.HeaderCell>

            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {categories &&
            categories.map((item) => {
              var date = item.date ? new Date(item.date) : null;

              var formattedDate = date ? format(date, "MMMM do, yyyy") : "";

              console.log(formattedDate);
              return (
                <Table.Row key={item.expense_name + item.amount}>
                  <Table.Cell>{item.category_name}</Table.Cell>
                  <Table.Cell>{item.remarks}</Table.Cell>
                  <Table.Cell>
                    {item.color && (
                      <Label color={item.color}>{item.color}</Label>
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <Label style={{ cursor: "pointer" }}>Update</Label>
                    <Label style={{ cursor: "pointer" }}>Delete</Label>
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

export default CategoryContainer;
