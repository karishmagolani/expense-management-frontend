import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import { useForm } from "react-hook-form";

const AddNewModal = ({ closeModal, showModal, getExpenses, categories }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const input = {
      expense_name: data.name,
      amount: data.amount,
      remarks: data.remarks,
      date: data.date,
      category_id: data.category,
    };
    const response = await fetch("http://localhost:8080/expenses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": window.localStorage.getItem("token"),
      },
      body: JSON.stringify(input),
    });
    const result = await response.json();
    getExpenses();
    closeModal();
  };
  console.log(errors);
  return (
    <Modal size={"small"} open={true} onClose={closeModal}>
      <Modal.Header>ADD NEW EXPENSE</Modal.Header>
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
            <label>Amount</label>
            <input
              placeholder="amount"
              type="number"
              {...register("amount", { required: true })}
            />
            {errors.amount && errors.amount.type == "required" && (
              <span className="error">This field is required</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <select name="category" {...register("category")}>
              <option></option>
              {categories.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Remarks</label>
            <input placeholder="remarks" {...register("remarks")} />
          </Form.Field>
          <Form.Field>
            <label>Date</label>
            <input placeholder="date" type="date" {...register("date")} />
          </Form.Field>
          <Button positive>SUBMIT</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AddNewModal;
