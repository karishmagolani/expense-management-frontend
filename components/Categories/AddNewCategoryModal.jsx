import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { colors } from "./utils";

const AddNewCategoryModal = ({ closeModal, showModal, getCategories }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const input = {
      category_name: data.name,
      remarks: data.remarks,
      color: data.color,
    };
    const response = await fetch(
      "http://localhost:8080/expense-categories/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(input),
      }
    );
    const result = await response.json();
    getCategories();
    closeModal();
  };
  console.log(errors);
  return (
    <Modal size={"tiny"} open={true} onClose={closeModal}>
      <Modal.Header>ADD NEW CATEGORY</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="name"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && errors.name.type == "required" && (
              <span className="error">This field is required</span>
            )}
          </Form.Field>

          <Form.Field>
            <label>Remarks</label>
            <input placeholder="remarks" {...register("remarks")} />
          </Form.Field>
          <Form.Field>
            <label>Color</label>
            <select name="color" {...register("color")}>
              <option></option>
              {colors.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </Form.Field>
          <Button positive>SUBMIT</Button>
        </Form>
      </Modal.Content>
      {/* <Modal.Actions>
        {/* <Button type="button" negative onClick={closeModal}>
          CANCEL
        </Button> */}
      {/* <Button positive>SUBMIT</Button>
      </Modal.Actions> */}
    </Modal>
  );
};

export default AddNewCategoryModal;
